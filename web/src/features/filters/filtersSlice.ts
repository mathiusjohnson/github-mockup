import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
  EntityId
} from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'http://localhost:4000/languages'

interface LanguagesState {
  languages: Language[];
  status: 'idle' | 'pending';
  error: string | null;
}

// interface languageData {
//   [key: string]: unknown,
//   payload: languageData[] | Record<EntityId, languageData>; type: string;
//   id: number,
//   language: string,
//   status: string,
//   error: string | undefined | undefined
// }

interface MyKnownError {
  errorMessage: string
  // ...
}

const languagesAdapter = createEntityAdapter<LanguagesState>({
  selectId: language => language.id
})

const initialState: LanguagesState = languagesAdapter.getInitialState({
  languages: [],
  status: 'idle',
  error: null
})

export const fetchLanguages = createAsyncThunk<  {
  languageData: unknown,
  rejectValue: MyKnownError
}>(
  'languages/fetchLanguages',
  async (_, thunkAPI) => {
    if (thunkAPI.getState().loading !== 'pending') {
      return;
    }
    const response = await axios.get(url)
    return response.data as languageData
  }
)

export const languagesReducer = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLanguages.pending, (state) => {
      state.status = 'loading'
      return state;
    }),
    builder.addCase(fetchLanguages.fulfilled, (state, action: PayloadAction<languageData>) => {
      state.status = 'succeeded'
      languagesAdapter.upsertMany(state, action.payload)
      return state;
    }),
    builder.addMatcher(fetchLanguages.rejected, (state, action: PayloadAction<languageData>) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export const { selectAll: selectAllLanguages } = languagesAdapter.getSelectors(
  state => {
    return state.languages
  }
)

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL'
}

const filtersSlice = createSlice({
  name: 'visibilityFilters',
  initialState: VisibilityFilters.SHOW_ALL,
  reducers: {
    setVisibilityFilter(state, action) {
      return action.payload
    },
    addVisibilityFilter(state, action) {
      const type = action.payload.language.toUpperCase()
      const filter = action.payload.language
      VisibilityFilters[type] = filter
      return state
    }
  }
})

export const { setVisibilityFilter, addVisibilityFilter } = filtersSlice.actions

export default filtersSlice.reducer
