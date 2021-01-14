import { combineReducers } from '@reduxjs/toolkit';
import reposReducer from '../features/repos/reposSlice';
import visibilityFilterReducer from '../features/filters/filtersSlice';

export default combineReducers({
  reducer: {
    repos: reposReducer,
    visibilityFilter: visibilityFilterReducer,
  },
});
