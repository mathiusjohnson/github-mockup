import {
  createSlice,
} from '@reduxjs/toolkit'

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
