import React, { Component } from 'react'
import propTypes from 'prop-types'
import OktaAuth from '@okta/okta-auth-js'
import { withAuth } from '@okta/okta-react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const styles = {
  card: {
    minWidth: 275
  }
}

export default withAuth(
  class LoginForm extends Component {
    static propTypes = {
      baseUrl: propTypes.string.isRequired,
      auth: propTypes.object.isRequired,
      redirect: propTypes.func.isRequired
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
        .catch(err => throw new Error(`Found an error ${err}`))
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
        <Card style={styles.card}>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <div>
                <TextField
                  id="username"
                  label="Username"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  margin="normal"
                />
              </div>
              <div>
                <Button type="submit" variant="contained" color="primary">
                  LogIn
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )
    }
  }
)
