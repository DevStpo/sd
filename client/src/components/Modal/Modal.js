import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openModal, closeModal } from '../../actions/modalActions'
import './modal.css'

class Modal extends Component {
  tryHide = e => {
    if (e.target.classList.contains('modal')) {
      this.props.closeModal()
    }
  }
  closeModal = () => {
    this.props.closeModal()
  }
  render() {
    const { open: isOpen = false, component } = this.props.modal
    const showModal = isOpen ? 'showModal' : 'hideModal'

    return (
      <div className={`modal ${showModal}`} onClick={e => this.tryHide(e)}>
        <div className="modal__container">
          {isOpen ? component : ''}
          <button onClick={this.closeModal.bind(this)}>Cancel</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.modal
})

export default connect(
  mapStateToProps,
  { openModal, closeModal }
)(Modal)
