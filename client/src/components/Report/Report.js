import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTickets } from '../../actions/ticketActions'
import ThePieReport from '../ThePieReport/ThePieReport'
import TheTableReport from '../TheTableReport/TheTableReport'

import './report.css'

class Report extends Component {
  static propTypes = {
    getTickets: propTypes.func.isRequired,
    ticket: propTypes.object.isRequired
  }
  componentDidMount() {
    this.props.getTickets(this.getCompanyId())
  }
  getCompanyId = () => {
    return this.props.globalAuth.authData.companyId
  }
  getData = type => {
    let dataFinal
    switch (type) {
      case 'pie': {
        let [labels, data] = this.processData(this.props.ticket.tickets)
        dataFinal = this.createDataObj(labels, data)
        break
      }
      case 'table': {
        console.log('tickets', this.props.ticket.tickets)
        dataFinal = this.processData(this.props.ticket.tickets)
        break
      }
    }
    return dataFinal
  }
  processData = tickets => {
    const labels = [],
      data = []
    tickets.forEach(ticket => {
      labels.push(ticket.fields.title)
      data.push(this.getNumberOfTime(ticket.time))
    })
    return [labels, data]
  }
  getNumberOfTime = time => {
    return time.reduce((accumulator, currentValue) => {
      return accumulator + Number(currentValue.numberOfTime)
    }, 0)
  }
  createDataObj = (labels, data) => {
    return { labels, datasets: [{ data }] }
  }
  render() {
    const { tickets } = this.props.ticket
    console.log(this.props.ticket)
    const pieData = Object.keys(tickets).length
      ? this.getData('pie')
      : this.createDataObj([], [])
    const tableData = Object.keys(tickets).length
      ? this.getData('table')
      : [[], []]

    return (
      <div className="report">
        <TheTableReport data={tableData} />
        <ThePieReport data={pieData} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ticket: state.ticket,
  globalAuth: state.auth
})

export default connect(
  mapStateToProps,
  { getTickets }
)(Report)
