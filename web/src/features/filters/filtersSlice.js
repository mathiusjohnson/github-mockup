import { createSlice } from '@reduxjs/toolkit';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  JAVASCRIPT: 'Javascript',
  CSS: 'CSS',
};

const filtersSlice = createSlice({
  name: 'visibilityFilters',
  initialState: VisibilityFilters.SHOW_ALL,
  reducers: {
    setVisibilityFilter(state, action) {
      console.log(action);
      return action.payload;
    },
  },
});

export const { setVisibilityFilter } = filtersSlice.action;

export default filtersSlice.reducer;
