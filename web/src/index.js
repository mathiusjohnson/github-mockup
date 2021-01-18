import React from 'react'
import { render } from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'
import { loadState, saveState } from './helpers/localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  persistedState
})

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
