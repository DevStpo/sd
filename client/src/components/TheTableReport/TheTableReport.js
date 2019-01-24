import React, { Component } from 'react'
import propTypes from 'prop-types'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

class TheTableReport extends Component {
  static propTypes = {
    data: propTypes.array.isRequired
  }
  render() {
    const [labels, data] = this.props.data

    return (
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticket Title</TableCell>
                <TableCell>Number of Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {labels.map((label, idx) => {
                let key = `i-${idx}`
                return (
                  <TableRow key={key}>
                    <TableCell>{label}</TableCell>
                    <TableCell>{data[idx]}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
}

export default TheTableReport
