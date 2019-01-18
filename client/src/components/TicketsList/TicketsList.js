import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  getTickets,
  getTicket,
  deleteTicket
} from '../../actions/ticketActions'
import { getViews, setCurrentView } from '../../actions/viewActions'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'

import TableToolbar from '../TableToolbar/TableToolbar'
import TableListHead from '../TableListHead/TableListHead'
import AddTicketDialog from '../AddTicketDialog/AddTicketDialog'

function desc(a, b, orderBy) {
  if (b.fields[orderBy].toLowerCase() < a.fields[orderBy].toLowerCase()) {
    return -1
  }
  if (b.fields[orderBy].toLowerCase() > a.fields[orderBy].toLowerCase()) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy)
}

class TicketsList extends Component {
  static propTypes = {
    deleteTicket: propTypes.function.isRequired,
    classes: propTypes.object.isRequired,
    getTickets: propTypes.func.isRequired,
    getTicket: propTypes.func.isRequired,
    ticket: propTypes.object.isRequired,
    view: propTypes.object.isRequired,
    getViews: propTypes.func.isRequired,
    setCurrentView: propTypes.func.isRequired
  }
  state = {
    order: 'asc',
    orderBy: 'title',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    loaded: false
  }

  componentDidMount() {
    this.props.getTickets()
    this.props.getViews()
  }

  onDeleteClick = id => this.props.deleteTicket(id)

  onTicketClick = id => this.props.getTicket(id)

  handleRequestSort = (e, property) => {
    const orderBy = property
    let order = 'desc'
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }
    this.setState({ order, orderBy })
  }

  handleSelectAllClick = e => {
    if (e.target.checked) {
      this.setState(() => ({
        selected: this.props.ticket.tickets.map(ticket => ticket._id)
      }))
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (e, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    this.setState({ selected: newSelected })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { tickets } = this.props.ticket
    const { currentView = {} } = this.props.view
    const { classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const fields = currentView.fields ? currentView.fields : []

    return (
      <div>
        <Paper className={classes.root}>
          <TableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TableListHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={tickets.length}
                fields={fields}
              />
              <TableBody>
                {stableSort(tickets, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(ticket => {
                    const isSelected = this.isSelected(ticket._id)
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, ticket._id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={ticket._id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>

                        {fields.map(field =>
                          field.apiName === 'title' ? (
                            <TableCell key={field._id}>
                              <Link
                                to={`/ticket/${ticket._id}`}
                                onClick={this.onTicketClick.bind(
                                  this,
                                  ticket._id
                                )}
                              >
                                {ticket.fields[field.apiName]}
                              </Link>
                            </TableCell>
                          ) : (
                            <TableCell key={field._id}>
                              {ticket.fields[field.apiName]}
                            </TableCell>
                          )
                        )}

                        <TableCell>
                          <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                              <DeleteIcon
                                onClick={this.onDeleteClick.bind(
                                  this,
                                  ticket._id
                                )}
                              />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={tickets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        <AddTicketDialog />
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
  }
})

const mapStateToProps = state => ({
  ticket: state.ticket,
  view: state.view
})

export default connect(
  mapStateToProps,
  { getTickets, getTicket, deleteTicket, getViews, setCurrentView }
)(withStyles(styles)(TicketsList))
