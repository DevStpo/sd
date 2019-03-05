import axios from 'axios'
import {
  GET_WORKFLOWS,
  GET_WORKFLOW,
  SET_CURRENT_WORKFLOW,
  ADD_WORKFLOW,
  WORKFLOWS_LOADING,
  WORKFLOW_SAVING,
  OPS_SAVE,
  OPS_SAVE_RESTORE
} from './types'

export const getWorkflows = () => dispatch => {
  dispatch(setWorkflowsLoading())
  axios.get('/api/workflows').then(res =>
    dispatch({
      type: GET_WORKFLOWS,
      payload: res.data
    })
  )
}

export const getWorkflow = id => dispatch => {
  dispatch(setWorkflowsLoading())
  axios.get(`/api/workflows/${id}`).then(res =>
    dispatch({
      type: GET_WORKFLOW,
      payload: res.data
    })
  )
}

export const setCurrentWorkflow = workflowId => dispatch => {
  dispatch(setWorkflowsLoading())
  dispatch({
    type: SET_CURRENT_WORKFLOW,
    payload: workflowId
  })
}

export const addWorkflow = workflow => dispatch => {
  dispatch(saving())
  axios.post('/api/workflows', workflow).then(res => {
    dispatch({
      type: ADD_WORKFLOW,
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

export const saving = () => {
  return {
    type: WORKFLOW_SAVING
  }
}

export const setWorkflowsLoading = () => {
  return {
    type: WORKFLOWS_LOADING
  }
}
