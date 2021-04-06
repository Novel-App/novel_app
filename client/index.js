import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

//service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope)
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error)
    })
}

navigator.serviceWorker.register('/service-worker.js', {
  scope: '/app/'
})
