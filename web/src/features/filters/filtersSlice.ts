import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:4000/languages'

interface languageData {
  id: number,
  language: string,
  // ...
}


const languagesAdapter = createEntityAdapter<languageData>({
  selectId: language => language.id
})

const initialState = languagesAdapter.getInitialState({
  status: 'idle',
  error: null
})

export const fetchLanguages = createAsyncThunk(
  'languages/fetchLanguages',
  async () => {
    const response = await axios.get(url)
    return response.data as languageData
  }
)

export const languagesReducer = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLanguages.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchLanguages.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      languagesAdapter.upsertMany(state, action.payload)
    },
    [fetchLanguages.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
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
