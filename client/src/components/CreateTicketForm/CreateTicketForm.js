import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import FileUploader from '../FileUploader/FileUploader'

class CreateTicketForm extends Component {
  static propTypes = {
    fileUploaderAction: propTypes.func.isRequired,
    classes: propTypes.object.isRequired,
    fieldValues: propTypes.object.isRequired,
    setFieldValues: propTypes.func.isRequired,
    handleFieldValuesChange: propTypes.func.isRequired,
    fields: propTypes.array.isRequired
  }
  componentDidUpdate(prevProps) {
    if (prevProps.fields !== this.props.fields) {
      let fields = []
      for (let field of this.props.fields) {
        fields[field.name] = ''
      }
      this.props.setFieldValues(fields)
    }
  }

  handleChange = (fieldName, e) => {
    this.props.handleFieldValuesChange(fieldName, e)
  }

  createField = field => {
    switch (field.fieldType) {
      case 'text':
        return (
          <TextField
            key={field.name}
            id={field.name}
            label={field.name}
            type="text"
            name={field.name}
            value={this.props.fieldValues[field.name]}
            onChange={e => this.handleChange(field.name, e)}
            fullWidth
          />
        )

      case 'date':
        return (
          <TextField
            key={field.name}
            id={field.name}
            label={field.name}
            type="date"
            name={field.name}
            value={this.props.fieldValues[field.name]}
            onChange={e => this.handleChange(field.name, e)}
            fullWidth
          />
        )

      case 'file':
        return (
          <FileUploader
            key={field.name}
            action={this.props.fileUploaderAction}
          />
        )
    }
  }

  render() {
    const { fields, fieldValues } = this.props

    return (
      <React.Fragment>
        {Object.keys(fieldValues).length > 0 &&
          fields.map(field => this.createField(field))}
      </React.Fragment>
    )
  }
}

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

export default withStyles(styles)(CreateTicketForm)
