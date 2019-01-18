import axios from 'axios'
import { GET_VIEWS, SET_CURRENT_VIEW, ADD_VIEW, VIEWS_LOADING } from './types'

export const getViews = () => dispatch => {
  dispatch(setViewsLoading())
  axios.get('/api/views').then(res =>
    dispatch({
      type: GET_VIEWS,
      payload: res.data
    })
  )
}

export const setCurrentView = viewId => dispatch => {
  dispatch(setViewsLoading())
  dispatch({
    type: SET_CURRENT_VIEW,
    payload: viewId
  })
}

export const addView = view => dispatch => {
  axios.post('/api/views', view).then(res =>
    dispatch({
      type: ADD_VIEW,
      payload: res.data
    })
  )
}

export const setViewsLoading = () => {
  return {
    type: VIEWS_LOADING
  }
}
