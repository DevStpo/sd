import { connect } from 'react-redux'
import { setAuthData, resetAuthData } from '../../actions/authActions'

export default function withReducedStateAuth(Component) {
  const mapStateToProps = state => ({
    globalAuth: state.auth
  })
  return connect(
    mapStateToProps,
    { setAuthData, resetAuthData }
  )(Component)
}
