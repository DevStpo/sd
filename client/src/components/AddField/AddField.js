import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

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

class AddField extends Component {
  state = {
    name: '',
    type: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <TextField
          label="Field Name"
          className={classes.textField}
          margin="normal"
          onChange={e => this.onChange(e)}
          value={this.state.name}
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Type</InputLabel>
          <Select
            name="type"
            value={this.state.type}
            onChange={e => this.onChange(e)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  }
}

AddField.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddField)
