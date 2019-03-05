import React, { Component } from 'react'
import propTypes from 'prop-types'
import { addWorkflow, getWorkflows } from '../../actions/workflowActions'
import { connect } from 'react-redux'

import Chip from '@material-ui/core/Chip'

import MessageNotification from '../MessageNotification/MessageNotification'

import './addWorkflow'

class AddWorkflow extends Component {
  static propTypes = {
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
    const { workflow, values } = this.state

    return (
      <div className="workflow">
        <label htmlFor="workflowName">
          Workflow Name
          <input
            type="text"
            id="workflowName"
            name="name"
            label="Workflow Name"
            value={this.state.name}
            onChange={e => this.handleChange(e)}
          />
        </label>
        <div>
          <button onClick={this.onStatusGroupAdd}>Add Status Group</button>
        </div>

        {workflow.length > 0 &&
          workflow.map((statusGroup, idx) => {
            let statusGroupId = `g-${idx}`
            return (
              <div key={statusGroupId}>
                <h2>Status Group</h2>
                <div className="status-group">
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
                        color="primary"
                      />
                    )
                  })}
                </div>
                <label htmlFor={statusGroupId}>
                  Status
                  <input
                    type="text"
                    id={statusGroupId}
                    onChange={e => this.handleChange(e, true)}
                    value={values[idx]}
                  />
                </label>
                <button
                  onClick={this.onAddStatus.bind(this, idx, statusGroupId)}
                >
                  Add Status
                </button>
                <button
                  aria-label="Delete"
                  onClick={this.onDeleteStatusGroup.bind(this, idx)}
                >
                  Delete
                </button>
              </div>
            )
          })}
        <div>
          <button onClick={this.onSaveWorkflow}>Save Workflow</button>
        </div>
        <MessageNotification />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workflow: state.workflow,
  ops: state.ops
})

export default connect(
  mapStateToProps,
  { addWorkflow, getWorkflows }
)(AddWorkflow)
