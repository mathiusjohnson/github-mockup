import { combineReducers } from 'redux'
import reposReducer from '../features/repos/repoSlice'
import visibilityFilterReducer from '../features/filters/filtersSlice'
import languagesReducer from '../features/languages/languagesSlice'

const rootReducer = combineReducers({
  repos: reposReducer,
  visibilityFilter: visibilityFilterReducer,
  languages: languagesReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
