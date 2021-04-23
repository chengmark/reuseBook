import { Request, Response } from 'express'
import {
  ListChatRooms,
  CreateChatRoom,
  ListUserChatRooms,
  GetChatRoom,
  DeleteChatRoom,
  AddMessage,
  AddUser,
  DeleteMessage,
  ListMessages,
  ListUsers,
} from './params'
import mongoose from 'mongoose'
import Chat from '../../models/Chat'
import Message from '../../models/Message'
import User from '../../models/User'

const ChatController = {
  // list all chat rooms
  listChatRooms: async (req: Request, res: Response): Promise<void> => {
    const { status } = <ListChatRooms>(<unknown>req.body)
    const query = status ? { status: status } : {}
    Chat.find(query, (err: any, data: any) => {
      if (err) return res.status(500).send({ message: 'Error in getting chat rooms from DB' })
      res.status(200).send(data)
    })
  },
  // create a chat room
  createChatRoom: async (req: Request, res: Response): Promise<void> => {
    const { buyerId, sellerId, roomname, bookId } = <CreateChatRoom>(<unknown>req.body)
    const newRoom = {
      name: mongoose.Types.ObjectId(roomname),
      book: mongoose.Types.ObjectId(bookId),
      messages: [],
      users: [mongoose.Types.ObjectId(buyerId), mongoose.Types.ObjectId(sellerId)],
    }
    Chat.create(newRoom, (err, data) => {
      if (err) {
        return res.status(400).send({ message: 'Error creating chat room' })
      }
      return res.status(200).send(data)
      // Chat.updateOne({ _id: data._id }, { $set: { users: newIds } }, {}, (err, result) => {
      //   if (err) {
      //     return res.status(400).send({ message: 'users not added' })
      //   }
      //   return res.status(200).send(result)
      // })
    })
  },
  // add message by chatroom id
  addMessage: async (req: Request, res: Response): Promise<void> => {
    const { roomId } = <AddMessage>(<unknown>req.params)
    const { body, author } = <AddMessage>(<unknown>req.body)
    const newMessage = { body: body, author: author }
    const chatRoomId = mongoose.Types.ObjectId(roomId)

    Message.create(newMessage, (err: any, data: any) => {
      if (err) {
        return res.status(400).send({ message: 'Error creating message' })
      }
      Chat.updateOne({ _id: chatRoomId }, { $push: { messages: data._id } }, {}, (error, result) => {
        if (error) {
          return res.status(400).send({ message: 'Error adding message to chat room' })
        }
        res.status(200).send(result)
      })
    })
  },
  // add user by room id
  addUser: async (req: Request, res: Response): Promise<void> => {
    const { roomId } = <AddUser>(<unknown>req.params)
    const { userId } = <AddUser>(<unknown>req.body)
    const _userId = mongoose.Types.ObjectId(userId)
    const _chatRoomId = mongoose.Types.ObjectId(roomId)

    Chat.updateOne({ _id: _chatRoomId }, { $push: { users: _userId as any } }, {}, (err, result) => {
      if (err) {
        return res.status(400).send({ message: 'Error adding user to chat room' })
      }
      return res.status(200).send(result)
    })
  },
  // list users by chatroom id
  listUserChatRooms: async (req: Request, res: Response): Promise<void> => {
    const { userId } = <ListUserChatRooms>(<unknown>req.params)
    const _userId = mongoose.Types.ObjectId(userId)
    Chat.find({ users: _userId })
      .populate('users')
      .populate('messages')
      .populate('book')
      .then((data) => {
        return res.status(200).send(data)
      })
  },
  // get chat room by room id
  getChatRoom: async (req: Request, res: Response): Promise<void> => {
    const { roomId } = <GetChatRoom>(<unknown>req.params)
    const _id = mongoose.Types.ObjectId(roomId)
    Chat.findOne({ _id: _id }, (err, data) => {
      if (err) {
        return res.status(400).send({ message: 'Error finding the chat room' })
      }
      return res.status(200).send(data)
    })
  },
  // delete chat room by room id
  deleteChatRoom: async (req: Request, res: Response): Promise<void> => {
    const { roomId } = <DeleteChatRoom>(<unknown>req.params)
    try {
      const _id = mongoose.Types.ObjectId(roomId)
      Chat.deleteOne({ _id: _id }, {}, (err: any) => {
        if (err) return res.status(500).send(err)
        res.status(200).send({ message: 'chat room deleted' })
      })
    } catch (e) {
      res.status(500).send({ message: 'invalid chat room Id' })
    }
  },
  // delete message by room id and message id
  deleteMessage: async (req: Request, res: Response): Promise<void> => {
    const { roomId, messageId } = <DeleteMessage>(<unknown>req.params)
    try {
      const _id = mongoose.Types.ObjectId(messageId)
      const _roomId = mongoose.Types.ObjectId(roomId)
      Message.deleteOne({ _id: _id }, {}, (err: any) => {
        if (err) return res.status(500).send(err)
        res.status(200).send({ message: 'message deleted' })
      })
    } catch (e) {
      res.status(500).send({ message: 'invalid messageId' })
    }
  },
  // list all users by room id
  listUsers: async (req: Request, res: Response): Promise<void> => {
    const { roomId } = <ListUsers>(<unknown>req.params)
    const _id = mongoose.Types.ObjectId(roomId)

    Chat.findOne({ _id: _id }, (err, data) => {
      if (err) {
        return res.status(400).send({ message: 'Error finding the chat room' })
      }
      const userIds = data.users
      const newIds: mongoose.Types.ObjectId[] = []
      userIds.forEach((userId) => {
        newIds.push(mongoose.Types.ObjectId(userId))
      })
      User.find(
        {
          _id: {
            $in: newIds,
          },
        },
        (errUser, dataUser) => {
          if (errUser) {
            res.status(400).send({ message: 'error listing all the users' })
          }
          res.status(200).send(dataUser)
        },
      )
    })
  },
  // list messages by room id
  listMessages: async (req: Request, res: Response): Promise<void> => {
    const { roomId } = <ListMessages>(<unknown>req.params)
    const _id = mongoose.Types.ObjectId(roomId)
    Chat.findOne({ _id: _id }, (err, data) => {
      if (err) {
        return res.status(400).send({ message: 'Error finding the chat room' })
      }
      const messageIds = data.messages
      const newIds: mongoose.Types.ObjectId[] = []
      messageIds.forEach((messageId) => {
        newIds.push(mongoose.Types.ObjectId(messageId))
      })
      Message.find(
        {
          _id: {
            $in: newIds,
          },
        },
        (errMsg, dataMsg) => {
          if (errMsg) {
            res.status(400).send({ message: 'error listing all the messages' })
          }
          res.status(200).send(dataMsg)
        },
      )
    })
  },
}

export default ChatController
