import { Server, Socket } from 'socket.io'
import controller from './lib/controller'

// extended socket typing
interface ExtSocket extends Socket {
  userId: string
}

// socket for chatroom
export default (httpServer: any) => {
  const io = new Server(httpServer)
  // const io = socket(httpServer)

  io.on('connection', (socket: Socket) => {
    const extSocket = <ExtSocket>socket
    console.log('connected')

    extSocket.on('disconnect', () => {
      console.log('disconnected')
    })

    extSocket.on('join', ({ roomId, userId }) => {
      extSocket.join(roomId)
      console.log(`${userId} joined chat ${roomId}`)
    })

    extSocket.on('leave', ({ roomId, userId }) => {
      extSocket.leave(roomId)
      console.log(`${userId} left chat ${roomId}`)
    })

    extSocket.on('message', async ({ roomId, userId, content }) => {
      console.log(content)
      if (content.trim().length > 0) {
        try {
          const message = await controller.saveMessage(userId, { roomId, content })
          io.to(roomId).emit('newMessage', message)
        } catch (err) {
          console.log(err)
        }
      }
    })
  })
  return io
}
