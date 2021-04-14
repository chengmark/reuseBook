import { Server, Socket } from 'socket.io'

import controller from './lib/controller'

interface ExtSocket extends Socket {
  userData: any
}

export default (httpServer: any) => {
  const io = new Server(httpServer)

  io.on('connection', (socket: Socket) => {
    const extSocket = <ExtSocket>socket
    console.log(extSocket.userData.userId + 'connected')

    extSocket.on('disconnect', () => {
      console.log(extSocket.userData.userId + 'disconnected')
    })

    extSocket.on('join', ({ id }) => {
      extSocket.join(id)
      console.log(`${extSocket.userData.userId} joined chat ${id}`)
    })

    extSocket.on('leave', ({ id }) => {
      extSocket.leave(id)
      console.log(`${extSocket.userData.userId} left chat ${id}`)
    })

    extSocket.on('message', async ({ id, content }) => {
      if (content.trim().length > 0) {
        try {
          const message = await controller.saveMessage(extSocket, { id, content })
          io.to(id).emit('newMessage', message)
        } catch (err) {
          console.log(err)
        }
      }
    })
  })
  return io
}
