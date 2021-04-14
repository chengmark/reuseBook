import axios from 'axios'

const URL = process.env.NODE_ENV == 'production' ? `${process.env.PUBLIC_URL}/api` : `http://localhost:3002/api`

const ChatService = {
  getChatroom: async (id: string): Promise<any> => {
    const response = await axios({
      method: 'get',
      url: `${URL}/chats/user/${id}`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    return await response.data
  },
  createChatroom: async (buyerId: string, sellerId: string, roomname: string): Promise<any> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/chats`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: { buyerId: buyerId, sellerId: sellerId, roomname: roomname },
    })
    return await response.data
  },
}

export default ChatService
