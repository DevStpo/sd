import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Pie } from 'react-chartjs-2'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

class ThePieReport extends Component {
  static propTypes = {
    data: propTypes.object.isRequired
  }
  render() {
    return (
      <Card>
        <CardContent>
          <Pie data={this.props.data} />
        </CardContent>
      </Card>
    )
  }
}

export default ThePieReport
