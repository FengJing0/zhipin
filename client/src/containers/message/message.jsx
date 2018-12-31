import React, {Component} from 'react'
import {connect} from "react-redux"
import {List, Badge} from "antd-mobile"

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs, userId) {
  const lastMsgObjs = {}

  chatMsgs.forEach(msg => {

    if (msg.to === userId && !msg.read) {
      msg.unReadCount = 1
    } else {
      msg.unReadCount = 0
    }

    const chatId = msg.chat_id
    const lastMsg = lastMsgObjs[chatId]

    if (lastMsg) {
      const unReadCount = lastMsg.unReadCount + msg.unReadCount
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg
      }
      lastMsgObjs[chatId].unReadCount = unReadCount
    } else {
      lastMsgObjs[chatId] = msg
    }
  })

  const lastMsgs = Object.values(lastMsgObjs)

  lastMsgs.sort((m1, m2) => {
    return m2.create_time - m1.create_time
  })
  return lastMsgs
}

class Message extends Component {
  render() {
    const user = this.props.user
    const {users, chatMsgs} = this.props.chat
    const userId = user._id
    if (!users[userId]) {
      return null
    }
    const lastMsg = getLastMsgs(chatMsgs, userId)

    return (
        <List style={{paddingBottom: 45, paddingTop: 45}}>
          {
            lastMsg.map(msg => {
              const targetUserId = msg.to === userId ? msg.from : msg.to
              const targetUser =users[targetUserId]
              const header = targetUser.header ? require(`../../assets/image/headers/${targetUser.header}.png`) : null

              return (
                  <Item extra={<Badge text={msg.unReadCount}/>}
                        key={msg._id}
                        thumb={header}
                        arrow='horizontal'
                        onClick={() => this.props.history.push(`/chat/${targetUserId}`)}>
                    {msg.content}
                    <Brief>
                      {targetUser.username}
                    </Brief>
                  </Item>)
            })
          }

        </List>
    )
  }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)