import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTicket, addFileToTicket } from '../../actions/ticketActions'
import { getTicketTypes, getTicketType } from '../../actions/ticketTypeActions'
import { withStyles } from '@material-ui/core/styles'

import CreateTicketForm from '../CreateTicketForm/CreateTicketForm'

class AddTicket extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    getTicketTypes: propTypes.func.isRequired,
    getTicketType: propTypes.func.isRequired,
    addTicket: propTypes.func.isRequired,
    ticketType: propTypes.object.isRequired,
    ticketTypes: propTypes.object.isRequired,
    selectedTicketType: propTypes.object.isRequired,
    globalAuth: propTypes.object.isRequired
  }
  static defaultProps = {
    ticketTypes: {},
    selectedTicketType: {}
  }

  initialState = {
    open: false,
    title: '',
    firstScreenOpen: true,
    ticketType: '',
    fields: {},
    workflow: {},
    status: '',
    files: []
  }
  state = { ...this.initialState }

  componentDidMount() {
    this.props.getTicketTypes()
  }

  handleClick = type => {
    switch (type) {
      case 'open':
        this.setState({ open: true })
        break
      case 'close':
        break
    }
  }

  onSubmit = e => {
    e.preventDefault()
    let newTicket = {
      fields: { ...this.state.fields },
      ticketType: this.state.ticketType,
      workflow: this.state.workflow,
      workflowStep: 0,
      status: this.state.status,
      companyId: this.props.globalAuth.authData.companyId
    }
    this.props.addTicket(newTicket, this.state.files)
  }

  fileUploaderAction = files => {
    this.setState({ files })
  }

  onTicketTypeSelect = (ticketType, workflow, status) => {
    this.setState({ ticketType, workflow, status, firstScreenOpen: false })
    this.props.getTicketType(ticketType)
  }

  setFieldValues = fields => {
    this.setState(prevState => ({
      fields: { ...prevState.fields, ...fields }
    }))
  }

  handleFieldValuesChange = (fieldName, e) => {
    let fieldValues = { ...this.state.fields }
    fieldValues[fieldName] = e.target.value
    this.setState({ fields: fieldValues })
  }

  render() {
    const { classes } = this.props
    const { firstScreenOpen } = this.state
    const {
      ticketTypes,
      selectedTicketType: { fields = [] }
    } = this.props.ticketType

    if (ticketTypes.length === 0)
      return (
        <div>
          Please create some Ticket Types before trying to create a new Ticket
        </div>
      )

    return (
      <div className="addTicket">
        <h1>Create new Ticket</h1>
        {firstScreenOpen && (
          <div>
            <h2>Which Ticket type would you like to create?</h2>
            {ticketTypes.map(ticketType => {
              const workflow = ticketType.workflow.workflow
                ? ticketType.workflow.workflow[0][0]
                : 'none'
              return (
                <div
                  key={ticketType._id}
                  className={classes.card}
                  onClick={this.onTicketTypeSelect.bind(
                    this,
                    ticketType._id,
                    ticketType.workflow._id,
                    workflow
                  )}
                >
                  <div>{ticketType.ticketTypeName}</div>
                </div>
              )
            })}
          </div>
        )}
        <form onSubmit={this.onSubmit}>
          {!firstScreenOpen && (
            <div>
              <CreateTicketForm
                fieldValues={this.state.fields}
                setFieldValues={this.setFieldValues}
                handleFieldValuesChange={this.handleFieldValuesChange}
                fileUploaderAction={this.fileUploaderAction}
                fields={fields}
              />
              <button type="submit">Create</button>
            </div>
          )}
        </form>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
})

const mapStateToProps = state => ({
  ticket: state.ticket,
  ticketType: state.ticketType,
  globalAuth: state.auth
})

export default connect(
  mapStateToProps,
  { addTicket, addFileToTicket, getTicketTypes, getTicketType }
)(withStyles(styles)(AddTicket))
