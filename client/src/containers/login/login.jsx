import React, {Component} from 'react'
import {InputItem, NavBar, WingBlank, Button, List, WhiteSpace} from "antd-mobile"

import Logo from "../../components/logo/logo"
import {connect} from "react-redux"
import {login} from "../../redux/actions"

import {Redirect} from "react-router-dom"


class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  login = () => {
    this.props.login(this.state)
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  toRegister = () => {
    this.props.history.push('/register')
  }

  render() {
    const {msg,redirectTo} = this.props.user

    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
        <div>
          <NavBar>直聘</NavBar>
          <Logo/>
          <WingBlank>
            <List>
              {msg ? <div className='error-msg'>{msg}</div> : null}
              <WhiteSpace/>
              <InputItem placeholeder='请输入用户名' onChange={value => this.handleChange('username', value)}>用户名:</InputItem>
              <WhiteSpace/>
              <InputItem placeholeder='请输入密码' type='password'
                         onChange={value => this.handleChange('password', value)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
              <WhiteSpace/>
              <Button type='primary' onClick={this.login}>登陆</Button>
              <WhiteSpace/>
              <Button onClick={this.toRegister}>注册</Button>
            </List>
          </WingBlank>
        </div>
    )
  }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)

