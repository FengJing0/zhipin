import React, {Component} from 'react'
import {connect} from "react-redux"
import {InputItem, List, NavBar} from "antd-mobile"
import {sendMsg} from "../../redux/actions"


const Item = List.Item

class Chat extends Component {
  state = {
    content: ''
  }

  handleSend = () => {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    if(content){
      this.props.sendMsg({from,to,content})
      this.setState({content:''})
    }

  }

  render() {
    return (
        <div id='chat-page'>
          <NavBar>aa</NavBar>
          <List>
            <Item className='chat-me' extra='我'>33</Item>
          </List>

          <div className='am-tab-bar'>
            <InputItem placeholder='请输入'
                       value={this.state.content}
                       extra={<span>发送</span>}
                       onChange={val => this.setState({content: val})}
                       onClick={this.handleSend}/>
          </div>
        </div>
    )
  }
}

export default connect(
    state => ({user: state.user}),
    {sendMsg}
)(Chat)