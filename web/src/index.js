import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import rootReducer from './reducers';
import { loadState } from './helpers/localStorage';

const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  persistedState,
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
