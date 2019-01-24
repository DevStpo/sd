import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getTicket, updateTicketStatus } from '../../actions/ticketActions'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Toolbar from '@material-ui/core/Toolbar'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'

import AddCommentDialog from '../AddCommentDialog/AddCommentDialog'
import EditableField from '../EditableField/EditableField'
import AddTimeDialog from '../AddTimeDialog/AddTimeDialog'

class Ticket extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    getTicket: propTypes.func.isRequired,
    updateTicketStatus: propTypes.func.isRequired,
    ticket: propTypes.object.isRequired,
    currentTicket: propTypes.object.isRequired
  }
  static defaultProps = {
    currentTicket: {}
  }
  state = {
    reset: false
  }
  getTicketId = () => {
    const url = window.location.pathname.split('/')
    const ticketId = url ? url[2] : null
    return ticketId
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

  render() {
    const { classes } = this.props
    const {
      currentTicket: {
        _id: id,
        fields = {},
        ticketType: { fields: ticketTypeFields = [] } = {},
        workflow: { workflow = [] } = {},
        workflowStep = 0,
        status = '',
        comments = []
      }
    } = this.props.ticket
    const { reset } = this.state

    return (
      <div
        onClick={e => this.handleClick(e)}
        onKeyDown={e => this.handleClick(e)}
        role="presentation"
      >
        <Typography variant="title" color="inherit" className={classes.grow}>
          {fields.title}{' '}
          <Chip label={status} className={classes.chip} color="secondary" />
        </Typography>
        <Typography
          variant="subheading"
          color="inherit"
          className={classes.grow}
        >
          {fields.description}
        </Typography>
        <Paper className={classes.root}>
          <Toolbar>
            {workflow[workflowStep] &&
              workflow[workflowStep].map((nextStatus, idx) => {
                let btnId = `b-${idx}`
                return (
                  <Button
                    key={btnId}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.onStatusChanged.bind(this, {
                      ticketId: id,
                      nextStatus,
                      workflowStep,
                      workflow
                    })}
                  >
                    {nextStatus}
                  </Button>
                )
              })}
            <AddTimeDialog ticket={id} />
          </Toolbar>
          <Table className={classes.table}>
            <TableBody>
              {ticketTypeFields.map(field => {
                return (
                  <TableRow key={field._id}>
                    <TableCell>
                      <EditableField
                        name={field.name}
                        value={fields[field.name]}
                        type={field.fieldType}
                        reset={reset}
                        saveToId={this.getTicketId()}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>

        <Paper elevation={0} className={classes.root}>
          <Typography variant="title" color="inherit" className={classes.grow}>
            Comments
          </Typography>
          <AddCommentDialog ticket={id} />
          <List>
            {comments.map(comment => {
              const date = new Date(comment.date)
              return (
                <ListItem key={comment._id}>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText
                    primary={`${
                      comment.author.name
                    } - ${date.toLocaleString()}`}
                    secondary={comment.description}
                  />
                </ListItem>
              )
            })}
          </List>
        </Paper>
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
  ticket: state.ticket
})

export default connect(
  mapStateToProps,
  { getTicket, updateTicketStatus }
)(withStyles(styles)(Ticket))
