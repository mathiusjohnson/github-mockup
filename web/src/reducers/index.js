import { combineReducers } from 'redux';
import visibilityFilterReducer from '../features/filters/Footer';
import reposReducer from '../features/repos/reposSlice';

export default combineReducers({
  visibilityFilter: visibilityFilterReducer,
  repos: reposReducer,
});
