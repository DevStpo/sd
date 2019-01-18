import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { addWorkflow, getWorkflows } from '../../actions/workflowActions'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'

class AddWorkflow extends Component {
  static propTypes = {
    classes: propTypes.object.isRequired,
    addWorkflow: propTypes.func.isRequired,
    getWorkflows: propTypes.func.isRequired,
    workflow: propTypes.object.isRequired
  }
  state = {
    name: '',
    workflow: [],
    values: [],
    showMsg: false
  }

  componentDidMount() {
    this.props.getWorkflows()
  }

  componentDidUpdate(prevProps) {
    if (this.props.workflow.saved != prevProps.workflow.saved) {
      this.setState({ showMsg: true })
    }
  }

  handleEvent = type => {
    let { name, workflow } = this.state
    switch (type) {
      case 'saveWorkflow':
        this.props.addWorkflow(name, workflow)
        break
    }
  }

  onStatusGroupAdd = () => {
    let workflow = [...this.state.workflow, []],
      values = [...this.state.values, []]
    this.setState({ workflow, values })
  }

  onDeleteStatusGroup = id => {
    let workflow = [...this.state.workflow],
      values = [...this.state.values]
    workflow.splice(id, 1)
    values.splice(id, 1)
    this.setState({ workflow, values })
  }

  onAddStatus = statusGroupId => {
    let workflow = [...this.state.workflow],
      values = [...this.state.values]
    workflow[statusGroupId].push(values[statusGroupId])
    values[statusGroupId] = ''
    this.setState({ workflow, values })
  }

  handleDelete = (statusGroup, status) => {
    let statusGroupId = statusGroup.split('-')[1],
      statusId = status.split('-')[1],
      workflow = [...this.state.workflow]
    workflow[statusGroupId].splice(statusId, 1)
    this.setState({ workflow })
  }

  handleClose = () => {
    this.setState({ showMsg: false })
  }

  handleChange = (e, isArray) => {
    if (isArray) {
      let id = e.target.id.split('-')[1],
        values = [...this.state.values]
      values[id] = e.target.value
      this.setState({ values })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  onSaveWorkflow = () => {
    this.props.addWorkflow(this.state)
  }

  render() {
    const { classes } = this.props
    const { workflow, values, showMsg } = this.state

    return (
      <div>
        {showMsg && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            open={showMsg}
            autoHideDuration={1000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id="message-id">Workflow Added</span>}
          />
        )}
        <Paper className={classes.root}>
          <TextField
            name="name"
            label="Workflow Name"
            type="text"
            value={this.state.name}
            onChange={e => this.handleChange(e)}
          />
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={this.onStatusGroupAdd}
          >
            Add Status Group
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.onSaveWorkflow}
          >
            Save Workflow
          </Button>

          {workflow.length > 0 &&
            workflow.map((statusGroup, idx) => {
              let statusGroupId = `g-${idx}`
              return (
                <Card className={classes.card} key={statusGroupId}>
                  <CardContent>
                    <Typography
                      variant="title"
                      color="inherit"
                      className={classes.grow}
                    >
                      Status Group
                    </Typography>
                    {statusGroup.map((status, idx) => {
                      let statusId = `s-${idx}`
                      return (
                        <Chip
                          key={statusId}
                          label={status}
                          onDelete={this.handleDelete.bind(
                            this,
                            statusGroupId,
                            statusId
                          )}
                          className={classes.chip}
                          color="primary"
                        />
                      )
                    })}
                  </CardContent>
                  <CardActions>
                    <TextField
                      label="Status"
                      type="text"
                      id={statusGroupId}
                      className="statusGroup-field"
                      onChange={e => this.handleChange(e, true)}
                      value={values[idx]}
                    />
                    <Button
                      size="small"
                      onClick={this.onAddStatus.bind(this, idx, statusGroupId)}
                    >
                      Add Status
                    </Button>
                    <IconButton
                      aria-label="Delete"
                      className={classes.margin}
                      onClick={this.onDeleteStatusGroup.bind(this, idx)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              )
            })}
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
  button: {
    margin: theme.spacing.unit
  },
  card: {
    minWidth: 275
  }
})

const mapStateToProps = state => ({
  workflow: state.workflow
})

export default connect(
  mapStateToProps,
  { addWorkflow, getWorkflows }
)(withStyles(styles)(AddWorkflow))
