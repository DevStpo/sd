import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import './editableField.css'

class EditableField extends Component {
  static propTypes = {
    value: propTypes.string.isRequired,
    fieldType: propTypes.string.isRequired,
    classes: propTypes.object.isRequired,
    isLoggedIn: propTypes.bool.isRequired
  }

  state = {
    isEditing: false,
    value: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onClick = e => {
    if (e.target.classList.contains('editableField__value')) {
      this.setState(({ isEditing }) => {
        return { isEditing: !isEditing, value: this.props.value }
      })
    }
  }

  render() {
    const { name, value, type } = this.props

    const fieldToRender = (
      <input
        id={name}
        type={type}
        name="value"
        value={this.state.value}
        onChange={this.onChange}
      />
    )

    const field = this.state.isEditing ? fieldToRender : value

    return (
      <div className="editableField">
        <div className="editableField__label">{name}: </div>
        <div
          onClick={e => this.onClick(e)}
          onKeyPress={e => this.onClick(e)}
          role="textbox"
          tabIndex={0}
          className="editableField__value"
        >
          {field}
        </div>
      </div>
    )
  }
}

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

export default withStyles(styles)(EditableField)
