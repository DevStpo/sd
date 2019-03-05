import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'

import Login from './components/Login/Login'
import Main from './components/Main/Main'

function onAuthRequired({ history }) {
  history.push('/login')
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Security
            issuer="https://dev-631205.oktapreview.com/oauth2/default"
            client_id="0oaiox8bixeNHlPGg0h7"
            redirect_uri={window.location.origin + '/implicit/callback'}
            onAuthRequired={onAuthRequired}
            scope={['openid', 'email', 'profile', 'company']}
          >
            <Route
              path="/"
              exact={true}
              render={() => (
                <Login baseUrl="https://dev-631205.oktapreview.com" />
              )}
            />
            <SecureRoute path="/main" component={Main} />
            <Route
              path="/login"
              render={() => (
                <Login baseUrl="https://dev-631205.oktapreview.com" />
              )}
            />
            <Route path="/implicit/callback" component={ImplicitCallback} />
          </Security>
        </Router>
      </Provider>
    )
  }
}

export default hot(module)(App)
