import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './menuItem.css'

class MenuItem extends Component {
  removeClass = element => {
    element.classList.remove('menuItem__options--show')
  }
  showMenu = e => {
    e.target
      .querySelector('.menuItem__options')
      .classList.add('menuItem__options--show')
  }
  hideMenu = e => {
    const element = e.target.closest('.menuItem__options')
    if (!element) {
      this.removeClass(e.target.querySelector('.menuItem__options--show'))
    } else {
      this.removeClass(element)
    }
  }
  render() {
    const { label, options } = this.props
    return (
      <div className="menuItem">
        <div
          className="menuItem__label"
          onMouseEnter={e => this.showMenu(e)}
          onMouseLeave={e => this.hideMenu(e)}
        >
          {label}
          <div className="menuItem__options">
            {options.map((option, idx) => {
              const optionId = `o-${idx}`
              return (
                <div key={optionId} className="menuItem__option">
                  <Link to={option.linkTo} onClick={e => this.hideMenu(e)}>
                    {option.label}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default MenuItem
