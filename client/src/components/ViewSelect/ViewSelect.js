import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getViews, setCurrentView } from '../../actions/viewActions'
import { withStyles } from '@material-ui/core/styles'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

class ViewSelect extends Component {
  handleChange = e => this.props.setCurrentView(e.target.value)

  render() {
    const { classes } = this.props
    const { views } = this.props.view

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">View</InputLabel>
          <Select value="hola" onChange={this.handleChange} name="view">
            {views.map(view => (
              <MenuItem key={view._id} value={view._id}>
                {view.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

ViewSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  getViews: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  view: state.view
})

export default connect(
  mapStateToProps,
  { getViews, setCurrentView }
)(withStyles(styles)(ViewSelect))
