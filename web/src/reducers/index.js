import { combineReducers } from 'redux';
import reposReducer from 'features/repos/repoSlice';
import visibilityFilterReducer from 'features/filters/filtersSlice';
export default combineReducers({
  repos: reposReducer,
  visibilityFilter: visibilityFilterReducer
})
