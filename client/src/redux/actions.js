import {reqLogin, reqRegister} from "../api"
import {AUTH_SUCCESS, ERROR_MSG} from "./action-type"

const authSuccess = user => ({type: AUTH_SUCCESS, data: user})

const errorMsg = msg => ({type: ERROR_MSG, data: msg})

export const register = user => {
  const {username, password, password2, type} = user

  if (!username) {
    return errorMsg('�������û���')
  } else if (!password) {
    return errorMsg('����������')
  } else if (password && !password2) {
    return errorMsg('��ȷ������')
  } else if (password !== password2) {
    return errorMsg('2������Ҫһ��')
  }

  return async dispatch => {
    const response = await reqRegister({username, password, type})
    const result = response.data
    if (result.code === 0) {//�ɹ�
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

export const login = user => {
  const {username, password} = user

  if (!username) {
    return errorMsg('�������û���')
  } else if (!password) {
    return errorMsg('����������')
  }
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