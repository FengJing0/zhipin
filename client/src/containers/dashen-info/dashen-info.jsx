import React, {Component} from 'react'
import {connect} from "react-redux"
import {Button, InputItem, NavBar} from "antd-mobile"
import HeaderSelector from "../../components/header-selector/header-selector"
import {Redirect} from "react-router-dom"
import {updateUser} from "../../redux/actions"


class DashenInfo extends Component {

  state = {
    header: '',
    post: '',
    info: '',
  }

  setHeader = header => {
    this.setState({header})
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  render() {
    const {header, type} = this.props.user
    if (header) {
      const path = type === 'dashen' ? '/dashen' : '/laoban'
      return <Redirect to={path}/>
    }
    return (
        <div>
          <NavBar>大神信息完善</NavBar>
          <HeaderSelector setHeader={this.setHeader}/>
          <InputItem placeholder='请输入求职岗位' onChange={val => this.handleChange('post', val)}>求职岗位:</InputItem>
          <InputItem placeholder='请输入公司名称' onChange={val => this.handleChange('info', val)}>个人介绍:</InputItem>
          <Button type='primary' onClick={this.save}>保存</Button>
        </div>
    )
  }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(DashenInfo)