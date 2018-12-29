module.exports = server => {
  const io = require('socket.io')(server)

  io.on('connection', socket => {
    console.log('客户端链接上服务器')
    
    socket.on('sendMsg',data=>{
      console.log(data)
    })

  })

}

