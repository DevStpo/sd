import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TableListHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { fields = [] } = this.props

    return (
      <React.Fragment>
        <tr>
          {fields.map(row => {
            return (
              <th key={row._id} onClick={this.createSortHandler(row.apiName)}>
                {row.label}
              </th>
            )
          }, this)}
          <th>Actions</th>
        </tr>
      </React.Fragment>
    )
  }
}

TableListHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  fields: PropTypes.array.isRequired
}

export default TableListHead
