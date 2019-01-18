import React, { Component } from 'react'
import propTypes from 'prop-types'

class Profile extends Component {
  static propTypes = {
    auth: propTypes.object.isRequired,
    getProfile: propTypes.object.isRequired,
    userProfile: propTypes.object.isRequired
  }
  componentWillMount() {
    this.setState({ profile: {} })
    const { userProfile, getProfile } = this.props.auth
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile })
      })
    } else {
      this.setState({ profile: userProfile })
    }
  }
  render() {
    return <div>Profile</div>
  }
}

export default Profile
