import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getLanguages, Language} from './languagesAPI';

// Requesting all languages, with loading state, and only one request at a time

interface languagesState {
  languages: Language[];
  loading: 'idle' | 'pending';
  error: string | null;
}

const initialState: languagesState = {
  languages: [] as Language[],
  loading: 'idle',
  error: null,
};

export const fetchLanguages = createAsyncThunk<
  // Return type of the payload creator
  Language[],
  // First argument to the payload creator (provide void if there isn't one)
  void,
  // Types for ThunkAPI
  {state: languagesState}
>('languages/fetch', async (_, thunkAPI) => {
  async () => {
    if (thunkAPI.getState().loading !== 'pending') {
      return;
    }
  };
  const response = await getLanguages();
  return response.languages;
});

export const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error.message || null;
        }
      });
  },
});
