import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTime } from '../../actions/ticketActions'

class AddTime extends Component {
  static propTypes = {
    globalAuth: propTypes.object.isRequired,
    ticket: propTypes.string.isRequired,
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
    return (
      <div>
        <h1>Add Time</h1>
        <form noValidate autoComplete="off" onSubmit={e => this.onSubmit(e)}>
          <label htmlFor="description">
            Description
            <input
              type="text"
              id="description"
              name="description"
              onChange={this.onChange}
            />
          </label>
          <label htmlFor="numberOfTime">
            Time to Log
            <input
              type="text"
              id="numberOfTime"
              name="numberOfTime"
              onChange={this.onChange}
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  comment: state.comment,
  globalAuth: state.auth
})

export default connect(
  mapStateToProps,
  { addTime }
)(AddTime)
