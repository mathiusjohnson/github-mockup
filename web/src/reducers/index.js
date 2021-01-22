import { combineReducers } from 'redux';
import reposReducer from 'features/repos/repoSlice';
import visibilityFilterReducer from 'features/filters/filtersSlice';
import languagesReducer from 'features/languages/languagesSlice';

export default combineReducers({
  repos: reposReducer,
  visibilityFilter: visibilityFilterReducer,
  languages: languagesReducer,
});
