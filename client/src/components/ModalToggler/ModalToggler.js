import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openModal, closeModal } from '../../actions/modalActions'

class ModalToggler extends Component {
  openDialog = () => {
    this.props.openModal(this.props.component)
  }

  render() {
    return (
      <button onClick={this.openDialog.bind(this)}>{this.props.label}</button>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.modal
})

export default connect(
  mapStateToProps,
  { openModal, closeModal }
)(ModalToggler)
