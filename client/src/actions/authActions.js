import { SET_AUTH_DATA, RESET_AUTH_DATA, AUTH_DATA_LOADING } from './types'

export const setAuthData = authData => dispatch => {
  dispatch(setAuthDataLoading())
  dispatch({
    type: SET_AUTH_DATA,
    payload: authData
  })
}

export const resetAuthData = () => dispatch => {
  dispatch(setAuthDataLoading())
  dispatch({
    type: RESET_AUTH_DATA
  })
}

export const setAuthDataLoading = () => {
  return {
    type: AUTH_DATA_LOADING
  }
}
