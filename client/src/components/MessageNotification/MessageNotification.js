import React, { Component } from 'react'
import { connect } from 'react-redux'

class MessageNotification extends Component {
  render() {
    const { isSaved = {} } = this.props.ops
    return <div>{isSaved ? 'Saved!' : ''}</div>
  }
}

const mapStateToProps = state => ({
  ops: state.ops
})

export default connect(
  mapStateToProps,
  {}
)(MessageNotification)
