import { GET_VIEWS, SET_CURRENT_VIEW, VIEWS_LOADING } from '../actions/types'

const initialState = {
  views: [],
  currentView: [],
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VIEWS:
      return {
        ...state,
        views: action.payload,
        currentView: action.payload[0],
        loading: false
      }
    case SET_CURRENT_VIEW:
      return {
        ...state,
        currentView: state.views.find(view => view._id === action.payload),
        loading: false
      }
    case VIEWS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
