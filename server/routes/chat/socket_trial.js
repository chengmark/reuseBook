// const express = require('express');
// const app = express();
// const PORT = 3000 || process.env.PORT;

// app.listen(PORT, () => console.log('Server running on port 3000'));

const io = require('socket.io')(3000);

const users = {};

io.on('connection', socket => {
    socket.on('new-user', name => {
      users[socket.id] = name
      socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
      socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id])
      delete users[socket.id]
    })
  })



  socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
  })
  
  socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
  })
  
  socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
  })
  
  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
  })