import React, { Component } from 'react'
import propTypes from 'prop-types'

class FileUploader extends Component {
  static propTypes = {
    action: propTypes.func.isRequired
  }
  state = {
    files: [{ name: 'file-1', value: '' }],
    counter: 2
  }

  onAddFileField = () => {
    const newFileField = { name: `file-${this.state.counter}`, value: '' }
    this.setState(prevState => ({
      files: [...prevState.files, newFileField],
      counter: prevState.counter + 1
    }))
  }

  setFileValues = e => {
    let id = e.target.id.split('-')[1],
      files = [...this.state.files]
    const formDataFile = new FormData()
    formDataFile.append('file', e.target.files[0])
    files[id]['value'] = formDataFile
    return files
  }

  onChange = e => {
    const files = this.setFileValues(e)

    this.setState({ files }, () => {
      const fileValues = this.state.files.map(file => file.value)
      this.props.action(fileValues)
    })
  }

  render() {
    const { files } = this.state
    return (
      <div>
        {files.map((file, idx) => {
          let fileId = `upl-${idx}`
          return (
            <div key={fileId}>
              <input
                type="file"
                id={fileId}
                name={file.name}
                onChange={this.onChange}
              />
            </div>
          )
        })}
        <button onClick={this.onAddFileField}>Add Field</button>
      </div>
    )
  }
}

export default FileUploader
