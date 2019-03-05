import { MAIN_MENU } from '../mainMenu'
import React, { Component } from 'react'
import propTypes from 'prop-types'

import { withAuth } from '@okta/okta-react'
import ButtonMenu from '../ButtonMenu/ButtonMenu'
import MenuItem from '../MenuItem/MenuItem'

import './mainMenu.css'

export default withAuth(
  class MainMenu extends Component {
    static propTypes = {
      auth: propTypes.object.isRequired
    }
    constructor(props) {
      super(props)

      this.state = { authenticated: null, name: '' }
      this.checkAuthentication = this.checkAuthentication.bind(this)
      this.checkAuthentication()
    }

    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated()
      const { name } = await this.props.auth.getUser()
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated })
      }
      if (name !== this.state.name) {
        this.setState({ name })
      }
    }

    componentDidUpdate() {
      this.checkAuthentication()
    }

    render() {
      const menus = MAIN_MENU
      const menusToRender = menus.map((menu, idx) => {
        let menuId = `m-${idx}`
        return (
          <MenuItem
            key={menuId}
            label={menu.label}
            options={menu.options}
            className="mainMenu__item"
          />
        )
      })
      const { name } = this.state
      if (this.state.authenticated === null) return null
      return (
        <div className="mainMenu">
          <div>{name}</div>
          <div className="mainMenu">
            <div>{menusToRender}</div>
          </div>
        </div>
      )
    }
  }
)
