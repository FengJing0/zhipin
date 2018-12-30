import io from 'socket.io-client'

const socketio = io('ws://localhost:4000')
socketio.on('receiveMsg',data=>{
  console.log(data)
})


socketio.emit('sendMsg',{name:'abc'})