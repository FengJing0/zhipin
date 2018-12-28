import React, {Component} from 'react'
import {InputItem, NavBar, WingBlank, Button, List, WhiteSpace, Radio} from "antd-mobile"
import Logo from "../../components/logo/logo"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

import {register} from "../../redux/actions"

const ListItem = List.Item

class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'laoban' //laoban,dashen
  }

  register = () => {
    this.props.register(this.state)
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const {type} = this.state
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
              <InputItem placeholeder='请确定密码' type='password'
                         onChange={value => this.handleChange('password2', value)}>确认密码:</InputItem>
              <WhiteSpace/>
              <ListItem>
                <span>用户类型:</span>
                &nbsp;&nbsp;&nbsp;
                <Radio checked={type === 'dashen'} onChange={value => this.handleChange('type', 'dashen')}>大神</Radio>
                &nbsp;&nbsp;&nbsp;
                <Radio checked={type === 'laoban'} onChange={value => this.handleChange('type', 'laoban')}>老板</Radio>
              </ListItem>
              <WhiteSpace/>
              <Button type='primary' onClick={this.register}>注册</Button>
              <WhiteSpace/>
              <Button onClick={this.toLogin}>已有账户</Button>
            </List>
          </WingBlank>
        </div>
    )
  }
}

export default connect(
    state => ({user:state.user}),
    {register}
)(Register)