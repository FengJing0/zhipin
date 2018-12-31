import {combineReducers} from "redux"
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RESET_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  RESET_MSG_LIST,
  RESET_MSG, MSG_READ
} from "./action-type"
import {getRedirectTo} from '../utils/index'

const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo: ''
}

function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const {type, header} = action.data
      return {...action.data, redirectTo: getRedirectTo(type, header)}
    case ERROR_MSG:
      return {...state, msg: action.data}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

const initUserList = []

function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    case RESET_USER_LIST:
      return initUserList
    default:
      return state
  }
}

const initChat = {
  users: {},
  chatMsgs: [],
  unReadCount: 0
}

function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const {users, chatMsgs, userid} = action.data
      return {
        users, chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (msg.to === userid && !msg.read ? 1 : 0), 0)
      }
    case RECEIVE_MSG:
      const {chatMsg} = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount + (chatMsg.to === action.data.userid && !chatMsg.read ? 1 : 0)
      }
    case MSG_READ:
      const {count, from, to} = action.data
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg => {
          if (msg.from === from && msg.to === to && !msg.read) {
            return {...msg, read: true}
          } else {
            return msg
          }
        }),
        unReadCount: state.unReadCount - count
      }
    case RESET_MSG_LIST:
      return initChat
    case RESET_MSG:
      return initChat
    default:
      return state
  }
}


export default combineReducers({
  user, userList, chat
})

