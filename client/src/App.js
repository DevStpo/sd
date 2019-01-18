import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Route } from 'react-router-dom'
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'

import AppTopbar from './components/AppTopbar/AppTopbar'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import TicketsList from './components/TicketsList/TicketsList'
import Ticket from './components/Ticket/Ticket'
import AddWorkflow from './components/AddWorkflow/AddWorkflow'
import AddTicketType from './components/AddTicketType/AddTicketType'

function onAuthRequired({ history }) {
  history.push('/login')
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Security
              issuer="https://dev-631205.oktapreview.com/oauth2/default"
              client_id="0oaiox8bixeNHlPGg0h7"
              redirect_uri={window.location.origin + '/implicit/callback'}
              onAuthRequired={onAuthRequired}
            >
              <AppTopbar />
              <Route
                exact={true}
                path="/"
                render={() => (
                  <Login baseUrl="https://dev-631205.oktapreview.com" />
                )}
              />
              <Route
                path="/login"
                render={() => (
                  <Login baseUrl="https://dev-631205.oktapreview.com" />
                )}
              />

              <SecureRoute path="/dashboard" component={Dashboard} />
              <SecureRoute path="/tickets" component={TicketsList} />
              <Route path="/implicit/callback" component={ImplicitCallback} />

              <Route path="/ticket/:id" component={Ticket} />
              <Route path="/workflows/add" component={AddWorkflow} />
              <Route
                path="/tickets/add-ticket-type"
                component={AddTicketType}
              />
            </Security>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default hot(module)(App)
