import {
  GET_WORKFLOWS,
  GET_WORKFLOW,
  ADD_WORKFLOW,
  WORKFLOWS_LOADING,
  WORKFLOW_SAVING
} from '../actions/types'

const initialState = {
  workflows: [],
  currentWorkflow: {},
  loading: false,
  saved: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WORKFLOWS:
      return {
        ...state,
        workflows: action.payload,
        loading: false
      }
    case GET_WORKFLOW:
      return {
        ...state,
        currentWorkflow: action.payload,
        loading: false
      }
    case ADD_WORKFLOW:
      return {
        ...state,
        workflows: [action.payload, ...state.workflows],
        loading: false,
        saved: true
      }
    case WORKFLOW_SAVING:
      return {
        ...state,
        saved: false
      }
    case WORKFLOWS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
