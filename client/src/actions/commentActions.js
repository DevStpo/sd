import axios from 'axios'
import {
  GET_COMMENTS,
  GET_COMMENT,
  ADD_COMMENT,
  COMMENTS_LOADING,
  OPEN_MODAL,
  CLOSE_MODAL
} from './types'

export const getComments = () => dispatch => {
  dispatch(setCommentsLoading())
  axios.get('/api/comments').then(res =>
    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    })
  )
}

export const getComment = id => dispatch => {
  dispatch(setCommentsLoading())
  axios.get(`/api/comments/${id}`).then(res =>
    dispatch({
      type: GET_COMMENT,
      payload: res.data
    })
  )
}

export const addComment = comment => dispatch => {
  axios.post('/api/comments/' + comment.ticketId, comment).then(res => {
    axios
      .put('/api/tickets/comments/' + comment.ticketId, res.data)
      .then(res => {
        dispatch({
          type: CLOSE_MODAL
        })
        dispatch({
          type: ADD_COMMENT,
          payload: res.data
        })
      })
  })
}

export const setCommentsLoading = () => {
  return {
    type: COMMENTS_LOADING
  }
}
