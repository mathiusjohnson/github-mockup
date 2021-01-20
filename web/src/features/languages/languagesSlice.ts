import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {getLanguages, Language} from './languagesAPI';

// Requesting all languages, with loading state, and only one request at a time

interface languagesState {
  entities: Languages;
  ids: Array<number> [];
  status: 'idle';
  error: string | null;
}

interface Languages {
  id: number,
  language: string
}

const languagesAdapter = createEntityAdapter<Languages>({
  selectId: language => language.id
})

const initialState: languagesState = languagesAdapter.getInitialState({
  entities: {} as Languages,
  ids: [],
  status: 'idle',
  error: null,
});

/* eslint-disable */

export const fetchLanguages = createAsyncThunk<
  // Return type of the payload creator
  Language[],
  // First argument to the payload creator (provide void if there isn't one)
  void,
  // Types for ThunkAPI
  {state: languagesState}
>('languages/fetch', async (_, thunkAPI) => {
  // eslint-disable-line no-unused-expressions
  async () => {
    if (thunkAPI.getState().status !== 'idle') {
      return;
    }
  };

  const response = await getLanguages();
  console.log("languages: ", response.languages);

  return response.languages;
})();
/* eslint-disable */

export const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        if (state.status === 'idle') {
          state.status = 'idle';
        }
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        if (state.status === 'idle') {
          state.status = 'idle';
        }
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        if (state.status === 'idle') {
          state.status = 'idle';
          state.error = action.error.message || null;
        }
      });
  },
});

export default languagesSlice.reducer

export const { selectAll: selectAllLanguages } = languagesAdapter.getSelectors(
  state => {
    return state.languages
  }
)
