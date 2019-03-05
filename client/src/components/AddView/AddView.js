import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { addView } from '../../actions/viewActions'
import MessageNotification from '../MessageNotification/MessageNotification'

class AddView extends Component {
  static propTypes = {
    addView: propTypes.func.isRequired
  }
  initialState = {
    name: '',
    fields: [{ label: '', apiName: '' }],
    isDefault: false
  }
  state = {
    ...this.initialState
  }

  componentDidUpdate(prevProps) {
    if (this.props.ops.isSaved !== prevProps.ops.isSaved) {
      this.setState({
        ...this.initialState
      })
    }
  }

  onAddField = () => {
    const newField = { label: '', apiName: '' }
    this.setState(prevState => ({
      fields: [...prevState.fields, newField]
    }))
  }

  handleChange = e => {
    if (['label', 'apiName'].includes(e.target.name)) {
      let id = e.target.id.split('-')[1],
        fields = [...this.state.fields]
      fields[id][e.target.name] = e.target.value
      this.setState({ fields })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  setDefault = () => {
    this.setState(prevState => ({
      isDefault: !prevState.isDefault
    }))
  }

  onDelete = id => {
    let fields = [...this.state.fields]
    fields.splice(id, 1)
    this.setState({ fields })
  }

  save = () => {
    const view = {
      fields: [...this.state.fields],
      name: this.state.name,
      isDefault: this.state.isDefault
    }
    this.props.addView(view)
  }

  render() {
    const { fields } = this.state

    return (
      <div>
        <label htmlFor="name">
          View Name
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>

        {fields.map((field, idx) => {
          let fieldId = `field-${idx}`,
            labelId = `n-${idx}`,
            apiNameId = `l-${idx}`
          return (
            <div key={fieldId}>
              <label htmlFor={labelId}>
                Label
                <input
                  type="text"
                  id={labelId}
                  name="label"
                  value={fields[idx].label}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor={apiNameId}>
                API Name
                <input
                  type="text"
                  id={apiNameId}
                  name="apiName"
                  value={fields[idx].apiName}
                  onChange={this.handleChange}
                />
              </label>
              <button
                aria-label="Delete"
                onClick={this.onDelete.bind(this, idx)}
              >
                Delete
              </button>
            </div>
          )
        })}
        <label htmlFor="defaultView">
          Make this the Default View?
          <input
            type="checkbox"
            id="defaultView"
            name="isDefault"
            onChange={this.setDefault}
          />
        </label>
        <div>
          <button onClick={this.onAddField}>Add a Field</button>
        </div>
        <div>
          <button onClick={this.save}>Save View</button>
        </div>
        <MessageNotification />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  view: state.view,
  ops: state.ops
})

export default connect(
  mapStateToProps,
  { addView }
)(AddView)
