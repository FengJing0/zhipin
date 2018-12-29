import io from 'socket.io-client'

const socketio = io('ws://localhost:4000')

socketio.emit('sendMsg',{name:'abc'})