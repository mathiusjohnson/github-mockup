import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:4000/languages';

const languagesAdapter = createEntityAdapter({
	selectId: (language) => language.id,
})

// console.log(languagesAdapter);
const initialState = languagesAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchLanguages = createAsyncThunk('languages/fetchLanguages', async () => {
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
});


// export const fetchLanguages = createAsyncThunk(
//   'users/fetchById',
//   async (userId, thunkAPI) => {
//     const response = await fetch(url, {
//       signal: thunkAPI.signal,
//     })
//     console.log(response);
//     return await response.json()
//   }
// )
const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLanguages.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchLanguages.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      languagesAdapter.upsertMany(state, action.payload);
    },
    [fetchLanguages.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default languagesSlice.reducer;

export const {
  selectAll: selectAllLanguages,
} = languagesAdapter.getSelectors((state) => {
  console.log("state in language reducer: ", state);
  return state.languages });
