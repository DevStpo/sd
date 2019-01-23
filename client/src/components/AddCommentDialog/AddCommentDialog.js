import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/commentActions'
import { withStyles } from '@material-ui/core/styles'

import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

class AddCommentDialog extends Component {
  static propTypes = {
    globalAuth: propTypes.object.isRequired,
    ticket: propTypes.string.isRequired,
    classes: propTypes.object.isRequired,
    addComment: propTypes.func.isRequired
  }
  static defaultProps = {
    ticket: ''
  }
  state = {
    open: false,
    description: ''
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
      authData: { email = '', name = '' }
    } = this.props.globalAuth

    const newComment = {
      ticketId: this.props.ticket,
      description: this.state.description,
      author: { email, name }
    }
    this.props.addComment(newComment)
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
          Add Comment
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClick.bind(this, 'close')}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a comment</DialogTitle>
          <DialogContent>
            <form
              noValidate
              autoComplete="off"
              onSubmit={e => this.onSubmit(e)}
            >
              <TextField
                margin="dense"
                id="description"
                label="Your Comment"
                type="text"
                name="description"
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
  { addComment }
)(withStyles(styles)(AddCommentDialog))
