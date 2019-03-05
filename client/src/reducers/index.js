import { combineReducers } from 'redux'
import ticketReducer from './ticketReducer'
import viewReducer from './viewReducer'
import workflowReducer from './workflowReducer'
import commentReducer from './commentReducer'
import ticketTypeReducer from './ticketTypeReducer'
import authReducer from './authReducer'
import opsReducer from './opsReducer'
import modalReducer from './modalReducer'

export default combineReducers({
  ticket: ticketReducer,
  view: viewReducer,
  workflow: workflowReducer,
  comment: commentReducer,
  ticketType: ticketTypeReducer,
  auth: authReducer,
  ops: opsReducer,
  modal: modalReducer
})
