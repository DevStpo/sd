import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/commentActions'

class AddComment extends Component {
  static propTypes = {
    globalAuth: propTypes.object.isRequired,
    ticket: propTypes.string.isRequired,
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
    return (
      <div>
        <h1>Add a comment</h1>
        <form noValidate autoComplete="off" onSubmit={e => this.onSubmit(e)}>
          <label>
            Description
            <input
              type="text"
              id="description"
              name="description"
              onChange={this.onChange}
            />
          </label>
          <button onClick={this.handleClick.bind(this, 'close')} type="submit">
            Create
          </button>
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
  { addComment }
)(AddComment)
