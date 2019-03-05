import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types'

const initialState = {
  open: false,
  component: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        open: true,
        component: action.payload
      }
    case CLOSE_MODAL:
      return {
        ...state,
        open: false,
        component: null
      }
    default:
      return state
  }
}
