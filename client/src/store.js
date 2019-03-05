import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { loadState, saveState } from '../../localStorage'

const initialState = loadState()
const middleWare = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
)

store.subscribe(() => {
  saveState(store.getState())
})

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(applyMiddleware(...middleWare))
// )

export default store
