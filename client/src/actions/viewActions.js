import axios from 'axios'
import {
  GET_VIEWS,
  GET_DEFAULT_VIEW,
  SET_CURRENT_VIEW,
  ADD_VIEW,
  VIEWS_LOADING,
  OPS_SAVE,
  OPS_SAVE_RESTORE
} from './types'

export const getViews = () => dispatch => {
  dispatch(setViewsLoading())
  axios.get('/api/views').then(res =>
    dispatch({
      type: GET_VIEWS,
      payload: res.data
    })
  )
}

export const getDefaultView = () => dispatch => {
  dispatch(setViewsLoading())
  axios.get('/api/views/default').then(res => {
    dispatch({
      type: GET_DEFAULT_VIEW,
      payload: res.data
    })
  })
}

export const setCurrentView = viewId => dispatch => {
  dispatch(setViewsLoading())
  dispatch({
    type: SET_CURRENT_VIEW,
    payload: viewId
  })
}

export const addView = view => dispatch => {
  axios.post('/api/views', view).then(res => {
    dispatch({
      type: ADD_VIEW,
      payload: res.data
    })
    dispatch({
      type: OPS_SAVE
    })
    const restore = () =>
      dispatch({
        type: OPS_SAVE_RESTORE
      })
    setTimeout(restore, 3000)
  })
}

export const setViewsLoading = () => {
  return {
    type: VIEWS_LOADING
  }
}
