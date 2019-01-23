import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withAuth } from '@okta/okta-react'

import withReducedStateAuth from '../withReducedStateAuth/withReducedStateAuth'
import Button from '@material-ui/core/Button'

class LoginButton extends Component {
  static propTypes = {
    auth: propTypes.object.isRequired,
    logout: propTypes.func.isRequired,
    login: propTypes.func.isRequired,
    resetAuthData: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool.isRequired
  }
  static defaultProps = {
    login: () => {},
    logout: () => {},
    isAuthenticated: false
  }
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = { authenticated: null }
    this.checkAuthentication = this.checkAuthentication.bind(this)
    this.checkAuthentication()
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated()
    if (authenticated !== this.state.authenticated && this._isMounted) {
      this.setState({ authenticated })
    }
  }

  componentDidUpdate() {
    this.checkAuthentication()
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    if (this.state.authenticated === null) return null

    const button = this.state.authenticated ? (
      <Button
        onClick={() => {
          this.props.auth.logout()
          this.props.resetAuthData()
        }}
        variant="contained"
        color="primary"
      >
        Logout
      </Button>
    ) : (
      <Button
        onClick={() => this.props.auth.login()}
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    )

    return <div>{button}</div>
  }
}

export default withReducedStateAuth(withAuth(LoginButton))
