import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { addTicketType } from '../../actions/ticketTypeActions'
import { getWorkflows } from '../../actions/workflowActions'

import { TICKET_DEFAULT_FIELDS } from '../ticketDefaultFields'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import DataSelect from '../DataSelect/DataSelect'

class AddTicketType extends Component {
  static propTypes = {
    workflow: propTypes.object.isRequired,
    workflows: propTypes.object.isRequired,
    getWorkflows: propTypes.func.isRequired,
    addTicketType: propTypes.func.isRequired,
    classes: propTypes.object.isRequired
  }
  state = {
    ticketTypeName: '',
    fields: [{ name: '', fieldType: 'text' }],
    workflow: ''
  }

  componentDidMount() {
    this.props.getWorkflows()
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

  save = () => {
    const values = {
      fields: [...TICKET_DEFAULT_FIELDS, ...this.state.fields],
      ticketTypeName: this.state.ticketTypeName,
      workflow: this.state.workflow
    }
    this.props.addTicketType(values)
  }

  render() {
    const { classes } = this.props
    const { fields } = this.state
    const defaultFields = TICKET_DEFAULT_FIELDS.map(field => field.name)
    const { workflows = [] } = this.props.workflow
    const options = workflows.map(workflow => ({
      value: workflow._id,
      label: workflow.name
    }))

    return (
      <div>
        <TextField
          label="Ticket Type Name"
          className={classes.textField}
          margin="normal"
          name="ticketTypeName"
          value={this.state.ticketTypeName}
          onChange={this.handleChange}
        />
        {fields
          .filter(field => !defaultFields.includes(field.name))
          .map((field, idx) => {
            let fieldId = `field-${idx}`,
              nameId = `n-${idx}`,
              typeId = `t-${idx}`
            return (
              <div key={fieldId}>
                <TextField
                  label="Field Name"
                  className={classes.textField}
                  margin="normal"
                  id={nameId}
                  name="name"
                  value={fields[idx].name}
                  onChange={this.handleChange}
                />
                <Select
                  native={true}
                  name="fieldType"
                  id={typeId}
                  value={fields[idx].fieldType}
                  onChange={this.handleChange}
                >
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                </Select>
                <IconButton
                  aria-label="Delete"
                  className={classes.margin}
                  onClick={this.onDelete.bind(this, idx)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            )
          })}
        <DataSelect
          options={options}
          label="Workflow"
          handleChange={this.setWorkflow}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.onAddField}
        >
          Add a Field
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.save}
        >
          Save
        </Button>
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

const mapStateToProps = state => ({
  ticketType: state.ticketType,
  workflow: state.workflow
})

export default connect(
  mapStateToProps,
  { addTicketType, getWorkflows }
)(withStyles(styles)(AddTicketType))
