import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getViews,
  getDefaultView,
  setCurrentView
} from '../../actions/viewActions'
import MessageNotification from '../MessageNotification/MessageNotification'

class ViewSelect extends Component {
  componentDidMount() {
    this.props.getDefaultView()
  }
  handleChange = e => this.props.setCurrentView(e.target.value)

  render() {
    const { views } = this.props.view
    return (
      <div>
        <form autoComplete="off">
          <label htmlFor="age-simple">
            View
            <select onChange={this.handleChange} name="view">
              {views.map(view => (
                <option key={view._id} value={view._id}>
                  {view.name}
                </option>
              ))}
            </select>
          </label>
        </form>
        <MessageNotification />
      </div>
    )
  }
}

ViewSelect.propTypes = {
  getViews: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  view: state.view,
  ops: state.ops
})

export default connect(
  mapStateToProps,
  { getViews, getDefaultView, setCurrentView }
)(ViewSelect)
