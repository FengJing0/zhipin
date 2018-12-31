import React, {Component} from 'react'
import {connect} from "react-redux"
import {InputItem, List, NavBar, Icon, Grid} from "antd-mobile"
import {sendMsg, readMsg} from "../../redux/actions"
import QueueAnim from "rc-queue-anim"


const Item = List.Item

class Chat extends Component {
  state = {
    content: '',
    isShow: false
  }


  componentWillMount() {
    const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘']
    this.emojis = emojis.map(item => ({text: item}))
  }

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentDidUpdate(prevProps, prevState) {
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentWillUnmount() {
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
  }

  handleSend = () => {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    if (content) {
      this.props.sendMsg({from, to, content})
      this.setState({content: '', isShow: false})
    }
  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if (isShow) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    const meId = user._id

    if (!users[meId]) {
      return null
    }

    const targetId = this.props.match.params.userid
    const chatId = [meId, targetId].sort().join('_')

    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

    const targetHeader = users[targetId].header
    const targetName = users[targetId].username

    const header = targetHeader ? require(`../../assets/image/headers/${targetHeader}.png`) : null
    return (
        <div id='chat-page'>
          <NavBar icon={<Icon type="left"/>}
                  className='stick-header'
                  onLeftClick={() => this.props.history.goBack()}>{targetName}</NavBar>
          <List style={{paddingBottom: 45, paddingTop: 45}}>
            <QueueAnim type='left' delay={100} duration={100} interval={100}>
            {
              msgs.map(msg => {
                if (meId === msg.from) {
                  return <Item className='chat-me' extra='我' key={msg._id}>{msg.content}</Item>
                } else {
                  return <Item key={msg._id} thumb={header}>{msg.content}</Item>
                }
              })
            }
            </QueueAnim>
          </List>

          <div className='am-tab-bar'>
            <InputItem placeholder='请输入'
                       value={this.state.content}
                       extra={
                         <span>
                           <span onClick={this.toggleShow}>😀</span>&nbsp;&nbsp;
                           <span onClick={this.handleSend}>发送</span>
                         </span>
                       }
                       onFocus={() => this.setState({isShow: false})}
                       onChange={val => this.setState({content: val})}/>
            {
              this.state.isShow ?
                  <Grid data={this.emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={item => {
                          this.setState({content: this.state.content + item.text})
                        }}/>
                  : null
            }

          </div>
        </div>
    )
  }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg, readMsg}
)(Chat)