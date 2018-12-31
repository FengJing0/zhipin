import React, {Component} from 'react'
import {connect} from "react-redux"
import {Button, List, Modal, Result, WhiteSpace} from "antd-mobile"
import Cookies from "js-cookie"
import {resetUser,resetUserList,resetMsgList} from '../../redux/actions'


const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {
  checkOut = () => {

    Modal.alert('退出','确定退出登录吗？',[
      {
        text:'取消',
        onPress:()=>console.log('cancel')
      },
      {
        text:'确定',
        onPress:()=>{
          Cookies.remove('userid')
          this.props.resetUser()
          this.props.resetUserList()
          this.props.resetMsgList()
        }
      }
    ])
  }

  render() {
    const {username,post,company,header,info,salary} = this.props.user

    return (
        <div style={{marginBottom:50,marginTop:50}}>
          <Result img={header?<img src={require(`../../assets/image/headers/${header}.png`)} style={{width: 50}}
                            alt='header'/>:null}
                  title={username}
                  message={company}/>
          <List renderHeader={() => '相关信息'}>
            <Item multipleLine>
              <Brief>职位:{post}</Brief>
              <Brief>简介:{info}</Brief>
              {salary?<Brief>薪资:{salary}</Brief>:null}
            </Item>
          </List>
          <WhiteSpace/>
          <List>
            <Button type='warning' onClick={this.checkOut}>退出登录</Button>
          </List>
        </div>
    )
  }
}

export default connect(
    state => ({user: state.user}),
    {resetUser,resetUserList,resetMsgList}
)(Personal)