import {
  GET_TICKETS,
  GET_TICKET,
  ADD_TICKET,
  UPDATE_TICKET_STATUS,
  DELETE_TICKET,
  ADD_COMMENT,
  TICKETS_LOADING
} from '../actions/types'

const initialState = {
  tickets: [],
  currentTicket: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        loading: false
      }
    case GET_TICKET:
      return {
        ...state,
        currentTicket: action.payload,
        loading: false
      }
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket._id !== action.payload)
      }
    case ADD_TICKET:
      return {
        ...state,
        tickets: [action.payload, ...state.tickets]
      }
    case UPDATE_TICKET_STATUS:
      return {
        ...state,
        currentTicket: action.payload,
        loading: false
      }
    case ADD_COMMENT:
      return {
        ...state,
        currentTicket: action.payload,
        loading: false
      }
    case TICKETS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
