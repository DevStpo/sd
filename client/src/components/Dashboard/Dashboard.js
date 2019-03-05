import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ModalToggler from '../ModalToggler/ModalToggler'
import AddTicket from '../AddTicket/AddTicket'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>
          <Link to={`/main/tickets`}>Tickets</Link>
        </p>
        <p>
          <ModalToggler component={<AddTicket />} label={'Add Ticket'} />
        </p>
      </div>
    )
  }
}

export default Dashboard
