import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class AddCompany extends Component {
  state = {
    id: '',
    name: ''
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  save = () => {
    const { name } = this.state
    axios.post('/api/companies', name).then(res => {
      console.log(res.data._id)
      if (res.data._id) {
        this.setState({ id: res.data._id })
      }
    })
  }
  render() {
    const { classes } = this.props
    const { id, name } = this.state

    return (
      <div>
        <Paper className={classes.root}>
          <TextField
            name="name"
            label="Workflow Name"
            type="text"
            value={name}
            onChange={e => this.handleChange(e)}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.save}
          >
            Save Company
          </Button>
          Your company Name: {name}
          Your company ID: {id}
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

export default withStyles(styles)(AddCompany)
