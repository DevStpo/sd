import React, { Component } from 'react'
import propTypes from 'prop-types'
import OktaAuth from '@okta/okta-auth-js'
import { withAuth } from '@okta/okta-react'
import './loginForm.css'

export default withAuth(
  class LoginForm extends Component {
    static propTypes = {
      baseUrl: propTypes.string.isRequired,
      auth: propTypes.object.isRequired,
      redirect: propTypes.func.isRequired
    }
    static defaultProps = {
      redirect: () => {}
    }
    constructor(props) {
      super(props)
      this.state = {
        sessionToken: null,
        username: '',
        password: ''
      }

      this.oktaAuth = new OktaAuth({ url: props.baseUrl })

      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleUsernameChange = this.handleUsernameChange.bind(this)
      this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleSubmit(e) {
      e.preventDefault()
      this.oktaAuth
        .signIn({
          username: this.state.username,
          password: this.state.password
        })
        .then(res =>
          this.setState({
            sessionToken: res.sessionToken
          })
        )
        .catch(err => err)
    }

    handleUsernameChange(e) {
      this.setState({ username: e.target.value })
    }

    handlePasswordChange(e) {
      this.setState({ password: e.target.value })
    }

    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken })
        return null
      }

      return (
        <div className="loginForm">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">
              Username
              <input
                type="text"
                id="username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </label>
            <input type="submit" value="Login" />
          </form>
        </div>
      )
    }
  }
)
