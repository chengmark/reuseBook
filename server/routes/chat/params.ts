// clear listing of params for APIs
import mongoose from 'mongoose'

export type ListChatRooms = {
  status?: string
}

export type CreateChatRoom = {
  sellerId: string
  buyerId: string
  roomname: string
}

export type ListUserChatRooms = {
    userId: string
}


export type GetChatRoom = {
  roomId: string
}

export type DeleteChatRoom = {
  roomId: string
}


export type AddMessage = {
    roomId: string
    body: string
    author: string
}

export type AddUser = {
    userId: string
    roomId: string
}

export type DeleteMessage = {
    messageId: string
    roomId: string
}

export type ListMessages = {
    roomId: string
}

export type ListUsers = {
    roomId: string
} 









