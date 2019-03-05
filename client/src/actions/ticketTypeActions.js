import axios from 'axios'
import {
  GET_TICKET_TYPES,
  GET_TICKET_TYPE,
  ADD_TICKET_TYPE,
  TICKET_TYPES_LOADING,
  OPS_SAVE,
  OPS_SAVE_RESTORE
} from './types'

export const getTicketTypes = () => dispatch => {
  dispatch(setTicketTypesLoading())
  axios.get('/api/ticketTypes').then(res =>
    dispatch({
      type: GET_TICKET_TYPES,
      payload: res.data
    })
  )
}

export const getTicketType = id => dispatch => {
  dispatch(setTicketTypesLoading())
  axios.get(`/api/ticketTypes/${id}`).then(res =>
    dispatch({
      type: GET_TICKET_TYPE,
      payload: res.data
    })
  )
}

export const addTicketType = ticketType => dispatch => {
  axios.post('/api/ticketTypes', ticketType).then(res => {
    dispatch({
      type: ADD_TICKET_TYPE,
      payload: res.data
    })
    dispatch({
      type: OPS_SAVE
    })
    const restore = () =>
      dispatch({
        type: OPS_SAVE_RESTORE
      })
    setTimeout(restore, 3000)
  })
}

export const setTicketTypesLoading = () => {
  return {
    type: TICKET_TYPES_LOADING
  }
}
