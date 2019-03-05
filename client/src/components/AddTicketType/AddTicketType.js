import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTicketType } from '../../actions/ticketTypeActions'
import { getWorkflows } from '../../actions/workflowActions'
import { TICKET_DEFAULT_FIELDS } from '../ticketDefaultFields'
import { Link } from 'react-router-dom'

import DataSelect from '../DataSelect/DataSelect'
import MessageNotification from '../MessageNotification/MessageNotification'

class AddTicketType extends Component {
  static propTypes = {
    workflow: propTypes.object.isRequired,
    workflows: propTypes.object.isRequired,
    getWorkflows: propTypes.func.isRequired,
    addTicketType: propTypes.func.isRequired
  }
  static defaultProps = {
    workflows: {}
  }
  initialState = {
    ticketTypeName: '',
    fields: [{ name: '', fieldType: 'text' }],
    workflow: '',
    isSaved: false
  }
  state = {
    ...this.initialState
  }

  componentDidMount() {
    this.props.getWorkflows()
  }

  componentDidUpdate(prevProps) {
    if (this.props.ops.isSaved !== prevProps.ops.isSaved) {
      this.setState({
        ...this.initialState,
        fields: [{ name: '', fieldType: 'text' }]
      })
    }
  }

  setWorkflow = workflow => {
    this.setState({ workflow })
  }

  onAddField = () => {
    const newField = { name: '', fieldType: 'text' }
    this.setState(prevState => ({
      fields: [...prevState.fields, newField]
    }))
  }

  handleChange = e => {
    if (['name', 'fieldType'].includes(e.target.name)) {
      let id = e.target.id.split('-')[1],
        fields = [...this.state.fields]
      fields[id][e.target.name] = e.target.value
      this.setState({ fields })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  onDelete = id => {
    let fields = [...this.state.fields]
    fields.splice(id, 1)
    this.setState({ fields })
  }

  toCamelCase = str => {
    const arr = str.split(' ')
    const firstWord = arr[0].toLowerCase()
    const words = arr
      .slice(1)
      .map(str => str[0].toUpperCase().concat(str.slice(1)))

    return firstWord.concat(words.join(''))
  }
  save = () => {
    const fields = this.state.fields.map(field => ({
      name: this.toCamelCase(field.name),
      fieldType: field.fieldType
    }))
    const values = {
      fields: [...TICKET_DEFAULT_FIELDS, ...fields],
      ticketTypeName: this.state.ticketTypeName,
      workflow: this.state.workflow
    }
    this.props.addTicketType(values)
  }

  render() {
    const { fields } = this.state
    const { isSaved = {} } = this.props.ops
    const defaultFields = TICKET_DEFAULT_FIELDS.map(field => field.name)
    const { workflows = [] } = this.props.workflow
    const options = workflows.map(workflow => ({
      value: workflow._id,
      label: workflow.name
    }))

    if (workflows.length === 0)
      return (
        <div>
          You need to create at least one Workflow first, before creating a
          Ticket Type.{' '}
          <Link to="/main/admin/workflows">Create a new Workflow Here</Link>
        </div>
      )

    return (
      <div>
        <label htmlFor="ticketTypeName">
          Ticket Type Name
          <input
            type="text"
            id="ticketTypeName"
            name="ticketTypeName"
            value={this.state.ticketTypeName}
            onChange={this.handleChange}
          />
        </label>

        {fields
          .filter(field => !defaultFields.includes(field.name))
          .map((field, idx) => {
            let fieldId = `field-${idx}`,
              nameId = `n-${idx}`,
              typeId = `t-${idx}`
            return (
              <div key={fieldId}>
                <label htmlFor={nameId}>
                  Field Name
                  <input
                    type="text"
                    id={nameId}
                    name="name"
                    value={fields[idx].name}
                    onChange={this.handleChange}
                  />
                </label>
                <select
                  name="fieldType"
                  id={typeId}
                  value={fields[idx].fieldType}
                  onBlur={this.handleChange}
                  onChange={this.handleChange}
                >
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                </select>
                <button
                  aria-label="Delete"
                  onClick={this.onDelete.bind(this, idx)}
                >
                  Delete
                </button>
              </div>
            )
          })}
        <DataSelect
          options={options}
          label="Workflow"
          handleChange={this.setWorkflow}
        />
        <div>
          <button onClick={this.onAddField}>Add a Field</button>
        </div>
        <div>
          <button onClick={this.save}>Save Ticket Type</button>
        </div>
        <MessageNotification />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ticketType: state.ticketType,
  workflow: state.workflow,
  ops: state.ops
})

export default connect(
  mapStateToProps,
  { addTicketType, getWorkflows }
)(AddTicketType)
