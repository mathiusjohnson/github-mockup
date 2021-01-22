import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:4000/languages';

const languagesAdapter = createEntityAdapter({
  selectId: (language) => language.id,
});

const initialState = languagesAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchLanguages = createAsyncThunk(
  'languages/fetchLanguages',
  async () => {
    const response = await axios.get(url);
    return response.data;
  }
);

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

export const { selectAll: selectAllLanguages } = languagesAdapter.getSelectors(
  (state) => {
    return state.languages;
  }
);
