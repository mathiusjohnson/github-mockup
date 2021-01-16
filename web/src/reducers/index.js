import { combineReducers } from 'redux';
import reposReducer from 'features/repos/repoSlice';
import visibilityFilterReducer from 'features/filters/filtersSlice';
// import reposReducer from 'features/repos/reposSlice';
export default combineReducers({
  repos: reposReducer,
  // repos: reposReducer,
  visibilityFilter: visibilityFilterReducer
})
