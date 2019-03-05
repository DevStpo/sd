import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateTicketPartial } from '../../actions/ticketActions'
import './editableField.css'

class EditableField extends Component {
  static propTypes = {
    value: propTypes.string.isRequired,
    fieldType: propTypes.string.isRequired,
    classes: propTypes.object.isRequired,
    isLoggedIn: propTypes.bool.isRequired,
    name: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    reset: propTypes.bool.isRequired,
    updateTicketPartial: propTypes.func.isRequired,
    saveToId: propTypes.string.isRequired
  }
  static defaultProps = {
    fieldType: '',
    classes: {},
    isLoggedIn: false,
    reset: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.reset !== prevProps.reset) {
      this.setState({ isEditing: false })
    }
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

  save = e => {
    let textField = e.target.previousSibling
    this.props.updateTicketPartial(
      this.props.saveToId,
      textField.id,
      textField.value
    )
  }

  render() {
    const { name, value, type } = this.props

    const fieldToRender = (
      <div>
        <input
          id={name}
          type={type}
          name="value"
          value={this.state.value}
          onChange={this.onChange}
          className="editableField__input"
        />
        <button onClick={e => this.save(e)}>Save</button>
      </div>
    )

    const field = this.state.isEditing ? fieldToRender : value

    return (
      <div className="editableField">
        <div className="editableField__label">
          <b>{name}:</b>{' '}
        </div>
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

const mapStateToProps = state => ({
  ticket: state.ticket
})

export default connect(
  mapStateToProps,
  { updateTicketPartial }
)(EditableField)
