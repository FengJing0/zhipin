import ajax from './ajax'

export const reqRegister = user => ajax('/register', user, 'POST')

export const reqLogin = user => ajax('/login', user, 'POST')

export const reqUpdateUser = user => ajax('/update', user, 'POST')

export const reqUser = () => ajax('/user')


export const reqUserList = type => ajax('/userlist',{type})