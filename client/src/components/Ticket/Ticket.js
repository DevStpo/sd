import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
  getTicket,
  updateTicketStatus,
  addFileToTicket
} from '../../actions/ticketActions'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'

import AddComment from '../AddComment/AddComment'
import EditableField from '../EditableField/EditableField'
import AddTime from '../AddTime/AddTime'
import FileUploader from '../FileUploader/FileUploader'
import ModalToggler from '../ModalToggler/ModalToggler'

class Ticket extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    getTicket: propTypes.func.isRequired,
    updateTicketStatus: propTypes.func.isRequired,
    ticket: propTypes.object.isRequired,
    currentTicket: propTypes.object.isRequired,
    globalAuth: propTypes.object.isRequired,
    addFileToTicket: propTypes.func.isRequired
  }
  static defaultProps = {
    currentTicket: {}
  }
  state = {
    reset: false,
    files: []
  }
  getTicketId = () => {
    const url = window.location.pathname.split('/')
    const ticketId = url ? url[url.length - 1] : null
    return ticketId
  }

  getCompanyId = () => {
    return this.props.globalAuth.authData.companyId
  }

  componentDidMount() {
    this.props.getTicket(this.getTicketId())
  }

  onStatusChanged = obj => {
    let { ticketId, nextStatus, workflowStep } = obj
    this.props.updateTicketStatus(ticketId, workflowStep + 1, nextStatus)
  }

  handleClick = e => {
    if (
      !e.target.classList.contains('editableField__input') &&
      !e.target.classList.contains('editableField__value')
    ) {
      this.setState(({ reset }) => {
        return { reset: !reset }
      })
    }
  }

  fileUploaderAction = files => {
    this.props.addFileToTicket(this.getTicketId(), files)
  }

  render() {
    const {
      currentTicket: {
        _id: id,
        fields = {},
        ticketType: { fields: ticketTypeFields = [] } = {},
        workflow: { workflow = [] } = {},
        workflowStep = 0,
        status = '',
        comments = [],
        attachments = []
      }
    } = this.props.ticket
    const { reset } = this.state

    return (
      <div
        onClick={e => this.handleClick(e)}
        onKeyDown={e => this.handleClick(e)}
        role="presentation"
      >
        <h1>{fields.title}</h1>
        <h2>{status}</h2>
        <div>{fields.description}</div>
        <div>
          {workflow[workflowStep] &&
            workflow[workflowStep].map((nextStatus, idx) => {
              let btnId = `b-${idx}`
              return (
                <button
                  key={btnId}
                  onClick={this.onStatusChanged.bind(this, {
                    ticketId: id,
                    nextStatus,
                    workflowStep,
                    workflow
                  })}
                >
                  {nextStatus}
                </button>
              )
            })}
        </div>
        <ModalToggler label="Add Time" component={<AddTime ticket={id} />} />
        <table>
          <tbody>
            {ticketTypeFields.map(field => {
              return (
                <tr key={field._id}>
                  <td>
                    <EditableField
                      name={field.name}
                      value={fields[field.name]}
                      type={field.fieldType}
                      reset={reset}
                      saveToId={this.getTicketId()}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {attachments.map(attachment => (
          <div>{attachment.id}</div>
        ))}
        <FileUploader action={this.fileUploaderAction} />

        <h1>Comments</h1>
        <ModalToggler
          label="Add Comment"
          component={<AddComment ticket={id} />}
        />
        {comments.map(comment => {
          const date = new Date(comment.date)
          return (
            <div key={comment._id}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png"
                alt="avatar"
                width="50"
              />
              <h2>{`${comment.author.name} - ${date.toLocaleString()}`}</h2>
              <p>{comment.description}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  chip: {
    margin: theme.spacing.unit
  }
})

const mapStateToProps = state => ({
  ticket: state.ticket,
  globalAuth: state.auth
})

export default connect(
  mapStateToProps,
  { getTicket, updateTicketStatus, addFileToTicket }
)(withStyles(styles)(Ticket))
