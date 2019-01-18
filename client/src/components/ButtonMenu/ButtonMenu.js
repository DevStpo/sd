import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import './buttonMenu.css'

import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { Link } from 'react-router-dom'

class ButtonMenu extends Component {
  static propTypes = {
    label: propTypes.string.isRequired,
    options: propTypes.array.isRequired,
    classes: propTypes.object.isRequired
  }
  state = {
    open: false
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  }

  render() {
    const { label, options } = this.props
    const { open } = this.state

    return (
      <div className="buttonmenu">
        <Button
          buttonRef={node => {
            this.anchorEl = node
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          {label}
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    {options.map((option, idx) => {
                      let optionId = `o-${idx}`
                      return (
                        <Link
                          key={optionId}
                          to={option.linkTo}
                          onClick={this.handleClose}
                        >
                          <MenuItem>{option.label}</MenuItem>
                        </Link>
                      )
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex'
  }
}

export default withStyles(styles)(ButtonMenu)
