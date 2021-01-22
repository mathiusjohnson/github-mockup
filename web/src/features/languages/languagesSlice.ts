import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {getLanguages, Language} from './languagesAPI';

interface languagesState {
  entities: Languages;
  ids: Array<number> [];
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
  pending: string | null;
  fulfilled: string | null;
}

interface Languages {
    [key: string]: Language
}

const languagesAdapter = createEntityAdapter<Language>({
  selectId: language => language.id
})

const initialState: languagesState = languagesAdapter.getInitialState({
  entities: {} as Languages,
  ids: [],
  status: 'idle',
  error: null,
  pending: null,
  fulfilled: null
}) as languagesState;

/* eslint-disable */

export const fetchLanguages = createAsyncThunk<
  // Return type of the payload creator
  Languages,
  // pending: string | null,

  // First argument to the payload creator (provide void if there isn't one)
  void,
  {state: languagesState}
>('languages/fetch', async (_, thunkAPI) => {
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
