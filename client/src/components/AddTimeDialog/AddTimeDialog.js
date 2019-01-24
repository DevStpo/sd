import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTime } from '../../actions/ticketActions'
import { withStyles } from '@material-ui/core/styles'

import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

class AddTimeDialog extends Component {
  static propTypes = {
    globalAuth: propTypes.object.isRequired,
    ticket: propTypes.string.isRequired,
    classes: propTypes.object.isRequired,
    addTime: propTypes.func.isRequired
  }
  static defaultProps = {
    ticket: ''
  }
  state = {
    open: false,
    description: '',
    numberOfTime: 0
  }

  handleClick = type => {
    switch (type) {
      case 'open':
        this.setState({ open: true })
        break
      case 'close':
        this.setState({ open: false })
        break
    }
  }

  onSubmit = e => {
    e.preventDefault()
    const {
      authData: { name = '' }
    } = this.props.globalAuth

    const newTime = {
      description: this.state.description,
      numberOfTime: this.state.numberOfTime,
      author: name
    }
    this.props.addTime(this.props.ticket, newTime)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          aria-label="Add"
          onClick={this.handleClick.bind(this, 'open')}
          className={classes.fab}
        >
          Add Time
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClick.bind(this, 'close')}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-time">Add Time</DialogTitle>
          <DialogContent>
            <form
              noValidate
              autoComplete="off"
              onSubmit={e => this.onSubmit(e)}
            >
              <TextField
                margin="dense"
                id="description"
                label="What did you do?"
                type="text"
                name="description"
                fullWidth
                onChange={this.onChange}
              />
              <TextField
                margin="dense"
                id="numberOfTime"
                label="Time to log"
                type="text"
                name="numberOfTime"
                fullWidth
                onChange={this.onChange}
              />

              <DialogActions>
                <Button
                  onClick={this.handleClick.bind(this, 'close')}
                  color="primary"
                >
                  Cancel
                </Button>
                <ButtonBase
                  onClick={this.handleClick.bind(this, 'close')}
                  color="primary"
                  type="submit"
                >
                  Create
                </ButtonBase>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

const mapStateToProps = state => ({
  comment: state.comment,
  globalAuth: state.auth
})

export default connect(
  mapStateToProps,
  { addTime }
)(withStyles(styles)(AddTimeDialog))
