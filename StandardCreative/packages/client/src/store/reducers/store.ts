import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
  user: userReducer
})

// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
