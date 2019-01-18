import {
  GET_TICKET_TYPES,
  GET_TICKET_TYPE,
  ADD_TICKET_TYPE,
  TICKET_TYPES_LOADING
} from '../actions/types'

const initialState = {
  ticketTypes: [],
  selectedTicketType: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TICKET_TYPES:
      return {
        ...state,
        ticketTypes: action.payload,
        loading: false
      }
    case GET_TICKET_TYPE:
      return {
        ...state,
        selectedTicketType: action.payload,
        loading: false
      }
    case ADD_TICKET_TYPE:
      return {
        ...state,
        ticketTypes: [action.payload, ...state.ticketTypes],
        loading: false
      }
    case TICKET_TYPES_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
