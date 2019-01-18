import {
  GET_COMMENTS,
  GET_COMMENT,
  ADD_COMMENT_TO_TICKET,
  COMMENTS_LOADING
} from '../actions/types'

const initialState = {
  comments: [],
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        workflows: action.payload,
        loading: false
      }
    case GET_COMMENT:
      return {
        ...state,
        currentWorkflow: action.payload,
        loading: false
      }
    case ADD_COMMENT_TO_TICKET:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false
      }
    case COMMENTS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
