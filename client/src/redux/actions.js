import {reqLogin, reqRegister, reqUpdateUser, reqUser, reqUserList, reqChatMsgList, reqReadMsg} from "../api"
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
  RESET_MSG,
  MSG_READ
} from "./action-type"

import io from 'socket.io-client'


function initIO(dispatch, userid) {
  if (!io.socket) {
    io.socket = io('ws://localhost:4000')
    io.socket.on('receiveMsg', chatMsg => {
          if (chatMsg.to === userid || chatMsg.from === userid) {
            dispatch(receiveMsg({chatMsg,userid}))
          }
        }
    )
  }
}


const authSuccess = user => ({type: AUTH_SUCCESS, data: user})

const errorMsg = msg => ({type: ERROR_MSG, data: msg})

const receiveUser = user => ({type: RECEIVE_USER, data: user})

export const resetUser = msg => ({type: RESET_USER, data: msg})

const receiveUserList = userList => ({type: RECEIVE_USER_LIST, data: userList})

export const resetUserList = msg => ({type: RESET_USER_LIST, data: msg})

export const receiveMsgList = ({users, chatMsgs,userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs,userid}})

export const resetMsgList = () => ({type: RESET_MSG_LIST})

export const receiveMsg = ({chatMsg,userid}) => ({type: RECEIVE_MSG, data: {chatMsg,userid}})

export const msgRead = ({count,from ,to}) => ({type: MSG_READ, data: {count,from ,to}})

// export const receiveMsg = msg => ({type: RESET_MSG, data: msg})


export const register = user => {
  const {username, password, password2, type} = user

  if (!username) {
    return errorMsg('请输入用户名')
  } else if (!password) {
    return errorMsg('请输入密码')
  } else if (password && !password2) {
    return errorMsg('请确认密码')
  } else if (password !== password2) {
    return errorMsg('2次密码不一致')
  }

  return async dispatch => {
    const response = await reqRegister({username, password, type})
    const result = response.data
    if (result.code === 0) {//成功
      getMsgList(dispatch,result.data._id)
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

export const login = user => {
  const {username, password} = user

  if (!username) {
    return errorMsg('请输入用户名')
  } else if (!password) {
    return errorMsg('请输入密码')
  }
  return async dispatch => {
    const response = await reqLogin(user)
    const result = response.data
    if (result.code === 0) {//成功
      getMsgList(dispatch,result.data._id)
      dispatch(authSuccess(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

export const updateUser = user => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if (result.code === 0) {//成功
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0) {//成功
      getMsgList(dispatch,result.data._id)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

export const getUserList = type => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {//成功
      dispatch(receiveUserList(result.data))
    } else {
      // dispatch(resetUserList(result.msg))
    }
  }
}

async function getMsgList(dispatch,userid) {
  initIO(dispatch,userid)
  const response = await reqChatMsgList()
  const result = response.data
  if (result.code === 0) {
    const {users, chatMsgs} = result.data
    dispatch(receiveMsgList({users, chatMsgs,userid}))
  }
}


export const sendMsg = ({from, to, content}) => {
  return async dispatch => {
    console.log('发送：', {from, to, content})
    io.socket.emit('sendMsg', {from, to, content})
  }
}

export const readMsg = (from,to) => {
  return async dispatch =>{
    const response = await reqReadMsg(from)
    const result = response.data
    if (result.code === 0) {
      const count = result.data
      dispatch(msgRead({count,from,to}))
    }
  }
}