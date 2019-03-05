import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { getViews, setCurrentView } from '../../actions/viewActions'

class DataSelect extends Component {
  static propTypes = {
    handleChange: propTypes.func.isRequired,
    options: propTypes.array.isRequired,
    label: propTypes.string.isRequired,
    getViews: propTypes.func.isRequired,
    setCurrentView: propTypes.func.isRequired,
    view: propTypes.object.isRequired
  }
  state = {
    value: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    this.props.handleChange(e.target.value)
  }

  render() {
    const { options = [], label } = this.props

    return (
      <form autoComplete="off">
        <label htmlFor="dataSelect">
          {label}
          <select
            id="dataSelect"
            value={this.state.value}
            onBlur={e => this.handleChange(e)}
            onChange={e => this.handleChange(e)}
            name="value"
          >
            <option>--- Select ---</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  view: state.view
})

export default connect(
  mapStateToProps,
  { getViews, setCurrentView }
)(DataSelect)
