const Message = require('../db/models/message')
const Chat = require('../db/models/chat')

module.exports = io => {
  io.on('connection', socket => {
    console.log(socket.id, ' has made a persistent connection to the server!')

    socket.on('new-message', message => {
      console.log('sending a new message......', message)
      socket.broadcast.emit('get-message', message)
    })

    socket.on('new-chat', chat => {
      socket.broadcast.emit('new-chat', chat)
    })
  })
}
