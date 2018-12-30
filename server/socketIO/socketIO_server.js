const {ChatModel} = require('../db/models')

module.exports = server => {
  const io = require('socket.io')(server)

  io.on('connection', socket => {
    console.log('客户端链接上服务器')

    socket.on('sendMsg', ({from, to, content}) => {
      // console.log(io.sockets.sockets)

      const chat_id = [from, to].sort().join('_')
      const create_time = Date.now()
      new ChatModel({from, to, content, chat_id, create_time}).save((err, chatMsg) => {
      // 向所有连接上的客户端发消息
        io.emit('receiveMsg', chatMsg)
      })
    })

  })

}
