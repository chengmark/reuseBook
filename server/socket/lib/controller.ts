import { Server, Socket } from 'socket.io'
import Chat from '../../models/Chat'
import Message from '../../models/Message'

const Controller = {
  /**
   * save the message to chat room
   *
   * @param userId sender ID
   * @param roomId chat room ID
   * @param content message content
   */
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
