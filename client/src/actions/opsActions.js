import { OPS_SAVE, OPS_SAVE_RESTORE } from './types'

export const save = () => dispatch => {
  dispatch({
    type: OPS_SAVE
  })
}

export const saveRestore = () => dispatch => {
  dispatch({
    type: OPS_SAVE_RESTORE
  })
}
