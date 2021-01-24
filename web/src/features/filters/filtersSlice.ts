import {
  createSlice,
} from '@reduxjs/toolkit'

export interface IVisibilityFilters { SHOW_ALL: string; }

export const VisibilityFilters: IVisibilityFilters = {
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
      const type: string = action.payload.language.toUpperCase()
      const filter = action.payload.language


      VisibilityFilters[type as keyof IVisibilityFilters] = filter
      return state
    }
  }
})

export const { setVisibilityFilter, addVisibilityFilter } = filtersSlice.actions

export default filtersSlice.reducer
