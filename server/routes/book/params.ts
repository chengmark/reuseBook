// clear listing of params for APIs
import mongoose from 'mongoose'

export type ListBooks = {
  status?: string
}

export type CreateBook = {
  name: string
  author: string
  price: string
  category: string
}

export type Search = {
  name: string
  author: string
}

export type GetBook = {
  bookId: string
}

export type DeleteBook = {
  bookId: string
}

export type AdvancedSearch = {
    name: string
    price: string
    category: string
}

export type FindByCategory = {
    category: string
}

export type DeleteByCategory = {
    category: string
}

export type CreateChatRoom = {
    name: string
    Id: string
}


