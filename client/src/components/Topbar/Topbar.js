import React, { Component } from 'react'

import MainMenu from '../MainMenu/MainMenu'
import LoginButton from '../LoginButton/LoginButton'
import './topbar.css'

class Topbar extends Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    return (
      <div className="topbar">
        <h1>Smartempo Service Desk</h1>
        <LoginButton isAuthenticated={true} />
        <MainMenu />
      </div>
    )
  }
}

export default Topbar
