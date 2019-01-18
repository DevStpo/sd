import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

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
    if (e.target.classList.contains('editableField')) {
      this.setState({
        isEditing: !this.state.isEditing,
        value: this.props.value
      })
    }
  }

  render() {
    let fieldToRender = ''
    switch (this.props.fieldType) {
      case 'text':
        fieldToRender = (
          <input
            type="text"
            name="value"
            value={this.state.value}
            onChange={this.onChange}
          />
        )
    }
    const field = this.state.isEditing ? fieldToRender : this.props.value

    return (
      <span
        onClick={e => this.onClick(e)}
        onKeyPress={e => this.onClick(e)}
        className="editableField"
        role="textbox"
        tabIndex={0}
      >
        {field}
      </span>
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
