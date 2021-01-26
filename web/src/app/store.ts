import { configureStore } from '@reduxjs/toolkit';
import { loadState } from '../helpers/localStorage'
import rootReducer from '../reducers/index';
const preloadedState = loadState()

const store = configureStore({
  reducer: rootReducer,
  preloadedState
})

// SET THIS UP LATER
// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('../reducers/index').default
//     store.replaceReducer(newRootReducer)
//   })
// }

export type AppDispatch = typeof store.dispatch

export default store
