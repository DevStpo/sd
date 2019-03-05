import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'
import { withAuth } from '@okta/okta-react'

export default withAuth(
  class Login extends Component {
    static propTypes = {
      auth: propTypes.object.isRequired,
      baseUrl: propTypes.string.isRequired
    }
    constructor(props) {
      super(props)
      this.state = { authenticated: null }
      this.checkAuthentication = this.checkAuthentication.bind(this)
      this.checkAuthentication()
    }

    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated()
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated })
      }
    }

    componentDidUpdate() {
      this.checkAuthentication()
    }

    render() {
      if (this.state.authenticated === null) return null
      return this.state.authenticated ? (
        <Redirect to={{ pathname: '/main' }} />
      ) : (
        <LoginForm baseUrl={this.props.baseUrl} />
      )
    }
  }
)
