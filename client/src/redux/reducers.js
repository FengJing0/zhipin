import {combineReducers} from "redux"
import {AUTH_SUCCESS, ERROR_MSG} from "./action-type"
import {getRedirectTo} from '../utils/index'

const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo:''
}

function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const {type,header} = action.data
      return {...action.data,redirectTo:getRedirectTo(type,header)}
    case ERROR_MSG:
      return {...state, msg: action.data}
    default:
      return state
  }
}




export default combineReducers({
  user
})

