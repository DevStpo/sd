import { MAIN_MENU } from '../mainMenu'
import React, { Component } from 'react'
import propTypes from 'prop-types'

import ButtonMenu from '../ButtonMenu/ButtonMenu'
import Typography from '@material-ui/core/Typography'
import withReducedStateAuth from '../withReducedStateAuth/withReducedStateAuth'
import './mainMenu.css'

class MainMenu extends Component {
  static propTypes = {
    globalAuth: propTypes.object.isRequired,
    authData: propTypes.object.isRequired,
    isLoggedIn: propTypes.bool.isRequired
  }
  render() {
    const menus = MAIN_MENU
    const {
      authData: { name = '' },
      isLoggedIn
    } = this.props.globalAuth
    const menusToRender = menus.map((menu, idx) => {
      let menuId = `m-${idx}`
      return (
        <ButtonMenu
          key={menuId}
          label={menu.label}
          options={menu.options}
          className="mainMenu__item"
        />
      )
    })

    return (
      <div className="mainMenu">
        {isLoggedIn && (
          <div className="mainMenu">
            <div>
              <Typography variant="subtitle1" gutterBottom>
                {name}
              </Typography>
            </div>
            <div>{menusToRender}</div>
          </div>
        )}
      </div>
    )
  }
}

export default withReducedStateAuth(MainMenu)
