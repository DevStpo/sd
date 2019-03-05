import axios from 'axios'
import {
  GET_TICKETS,
  GET_TICKET,
  ADD_STANDARD_FIELDS,
  UPDATE_TICKET_STATUS,
  DELETE_TICKET,
  UPDATE_TICKET_PARTIAL,
  TICKETS_LOADING,
  CLOSE_MODAL
} from './types'

const addFile = (ticketId, file) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  axios.post(`/api/tickets/${ticketId}/files`, file, config).then(ticket => {
    dispatch({
      type: GET_TICKET,
      payload: ticket.data
    })
    return ticket.data
  })
}

export const addFileToTicket = (ticketId, files) => dispatch => {
  dispatch(setTicketsLoading())
  files.map(file => addFile(ticketId, file))
}

export const addTicket = (ticket, files) => dispatch => {
  dispatch(setTicketsLoading())
  axios.post('/api/tickets', ticket).then(ticket => {
    files.map(file => addFile(ticket.data._id, file))
    dispatch({
      type: CLOSE_MODAL
    })
  })
}

export const getTickets = companyId => dispatch => {
  dispatch(setTicketsLoading())
  axios.get(`/api/tickets/company/${companyId}`).then(res =>
    dispatch({
      type: GET_TICKETS,
      payload: res.data
    })
  )
}

export const getTicket = ticketId => dispatch => {
  dispatch(setTicketsLoading())
  axios.get(`/api/tickets/${ticketId}`).then(res =>
    dispatch({
      type: GET_TICKET,
      payload: res.data
    })
  )
}

export const deleteTicket = id => dispatch => {
  axios.delete(`/api/tickets/${id}`).then(() =>
    dispatch({
      type: DELETE_TICKET,
      payload: id
    })
  )
}

export const updateTicketStatus = (
  id,
  workflowStep,
  nextStatus
) => dispatch => {
  dispatch(setTicketsLoading())
  axios.put(`/api/tickets/${id}`, { workflowStep, nextStatus }).then(res =>
    dispatch({
      type: UPDATE_TICKET_STATUS,
      payload: res.data
    })
  )
}

export const updateTicketPartial = (id, fieldName, value) => dispatch => {
  dispatch(setTicketsLoading())
  axios.put(`/api/tickets/partial/${id}`, { fieldName, value }).then(res =>
    dispatch({
      type: UPDATE_TICKET_PARTIAL,
      payload: res.data
    })
  )
}

export const addTime = (ticketId, fields) => dispatch => {
  dispatch(setTicketsLoading())
  axios.put(`/api/tickets/time/${ticketId}`, { fields }).then(res => {
    dispatch({
      type: CLOSE_MODAL
    })
    dispatch({
      type: UPDATE_TICKET_PARTIAL,
      payload: res.data
    })
  })
}

export const addStandardFields = fields => dispatch => {
  axios.post('/api/tickets/addStandardFields', fields).then(res =>
    dispatch({
      type: ADD_STANDARD_FIELDS,
      payload: res.data
    })
  )
}

export const setTicketsLoading = () => {
  return {
    type: TICKETS_LOADING
  }
}
