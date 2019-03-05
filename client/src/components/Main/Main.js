import React, { Component } from 'react'
import { SecureRoute } from '@okta/okta-react'

import Topbar from '../Topbar/Topbar'
import Dashboard from '../Dashboard/Dashboard'
import TicketsList from '../TicketsList/TicketsList'
import Ticket from '../Ticket/Ticket'
import AddWorkflow from '../AddWorkflow/AddWorkflow'
import AddTicketType from '../AddTicketType/AddTicketType'
import Report from '../Report/Report'
import AddCompany from '../AddCompany/AddCompany'
import AddView from '../AddView/AddView'
import Modal from '../Modal/Modal'

import './main.css'

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Modal />
        <Topbar />
        <SecureRoute path="/main" exact={true} component={Dashboard} />
        <SecureRoute path="/main/tickets" component={TicketsList} />
        <SecureRoute path="/main/ticket" component={Ticket} />
        <SecureRoute path="/main/reports" component={Report} />
        <SecureRoute
          path="/main/admin/ticket-types"
          component={AddTicketType}
        />
        <SecureRoute path="/main/admin/workflows" component={AddWorkflow} />
        <SecureRoute path="/main/admin/companies" component={AddCompany} />
        <SecureRoute path="/main/admin/views" component={AddView} />
      </div>
    )
  }
}

export default Main
