import {reqLogin, reqRegister, reqUpdateUser,reqUser} from "../api"
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER} from "./action-type"

const authSuccess = user => ({type: AUTH_SUCCESS, data: user})

const errorMsg = msg => ({type: ERROR_MSG, data: msg})

const receiveUser = user => ({type: RECEIVE_USER, data: user})

const resetUser = msg => ({type: RESET_USER, data: msg})

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
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}