import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './app/store'


// const store = configureStore({
//   reducer: rootReducer,
// })

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
