import {reqLogin, reqRegister} from "../api"
import {AUTH_SUCCESS, ERROR_MSG} from "./action-type"

const authSuccess = user => ({type: AUTH_SUCCESS, data: user})

const errorMsg = msg => ({type: ERROR_MSG, data: msg})

export const register = user => {
  return async dispatch => {
    const response = await reqRegister(user)
    const result = response.data
    if (result.code === 0) {//�ɹ�
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

export const login = user => {
  return async dispatch => {
    const response = await reqLogin(user)
    const result = response.data
    if (result.code === 0) {//�ɹ�
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}