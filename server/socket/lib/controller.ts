import { Server, Socket } from 'socket.io'
import Chat from '../../models/Chat'
import Message from '../../models/Message'

interface ExtSocket extends Socket {
  userData: any
}

const Controller = {
  saveMessage: async (extSocket: any, { id, content }: any) => {
    const message = {content: content, sender: extSocket.userData.userId}
    Message.create(message, (err: any, data: any) => {
        Chat.findByIdAndUpdate(id, { $push: { messages: data._id} }, { new: true })
        return data
    })
  },
}

export default Controller
