import React, { Component } from 'react'
import propTypes from 'prop-types'
import axios from 'axios'

class AddCompany extends Component {
  state = {
    id: '',
    name: ''
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  save = () => {
    const { name } = this.state
    axios.post('/api/companies', name).then(res => {
      if (res.data._id) {
        this.setState({ id: res.data._id })
      }
    })
  }
  render() {
    const { id, name } = this.state

    return (
      <div>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            value={name}
            name="name"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <button onClick={this.save}>Save Company</button>
        Your company Name: {name}
        Your company ID: {id}
      </div>
    )
  }
}

export default AddCompany
