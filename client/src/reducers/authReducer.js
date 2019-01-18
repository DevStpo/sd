import {
  SET_AUTH_DATA,
  RESET_AUTH_DATA,
  AUTH_DATA_LOADING
} from '../actions/types'

const initialState = {
  authData: {},
  isLoggedIn: false,
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        authData: action.payload,
        isLoggedIn: true,
        loading: false
      }
    case RESET_AUTH_DATA:
      return {
        ...state,
        authData: {},
        isLoggedIn: false,
        loading: false
      }
    case AUTH_DATA_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
