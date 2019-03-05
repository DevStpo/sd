import { OPS_SAVE, OPS_SAVE_RESTORE } from '../actions/types'

const initialState = {
  isSaved: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case OPS_SAVE:
      return {
        ...state,
        isSaved: true
      }
    case OPS_SAVE_RESTORE:
      return {
        ...state,
        isSaved: false
      }
    default:
      return state
  }
}
