import { Server, Socket } from 'socket.io'
import Chat from '../../models/Chat'
import Message from '../../models/Message'

interface ExtSocket extends Socket {
  userData: any
}

const Controller = {
  saveMessage: async (userId: string, { roomId, content }: any) =>
    new Promise((resolve) => {
      const message = { content: content, sender: userId }
      Message.create(message, async (err: any, data: any) => {
        const chat = await Chat.findByIdAndUpdate(roomId, { $push: { messages: data._id } }, { new: true })
        resolve(data)
      })
    }),
}

export default Controller
