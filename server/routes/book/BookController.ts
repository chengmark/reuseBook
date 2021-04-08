import { Request, Response } from 'express'
import Book from '../../models/Book'
import { CreateBook, DeleteBook, GetBook, ListBooks, Search, AdvancedSearch, FindByCategory, DeleteByCategory, CreateChatRoom } from './params'
import mongoose from 'mongoose'
import Chat from '../../models/Chat'

const BookController = {

    listBooks: async (req: Request, res: Response): Promise<void> => {
        const { status } = <ListBooks>(<unknown>req.body)
        const query = status ? { status: status } : {}
        Book.find(query, (err: any, data: any) => {
            if (err) return res.status(500).send({ message: 'Error in getting books from DB' })
            res.status(200).send(data)
          })
    },

    createBook: async (req: Request, res: Response) => {
        console.log(req.body)
        const newBook = <CreateBook>(<unknown>req.body)
        //newBook.sellerId = req.signedCookies['SID']
        Book.create(newBook, (err: any, data: any) => {
            if(err){
                return res.status(500).send({message: 'Error in creating new book'})
            }
        })
        const newChatRoom = <CreateChatRoom>(<unknown>req.body)
        Chat.create(newChatRoom, (err: any, data: any) => {
            if(err){
                return res.status(500).send({message: 'Error creating chat room for book'})
            }
            res.status(200).send(data)
        })  
    },

    getBook: async (req: Request, res: Response): Promise<void> => {
        console.log(req.params)
        const { bookId } = <GetBook>(<unknown>req.params)
        try {
            const _id = mongoose.Types.ObjectId(bookId)
            Book.findOne({ _id: _id }, (err: any, data: any) => {
              if (err) return res.status(500).send(err)
              if (!data) return res.status(500).send({ message: 'book not found' })
              res.status(200).send(data)
            })
          } catch (e) {
            res.status(500).send({ message: 'invalid bookId' })
          }
    },

    deleteBook: async (req: Request, res: Response): Promise<void> => {
        const { bookId } = <DeleteBook>(<unknown>req.params)
        try {
          const _id = mongoose.Types.ObjectId(bookId)
          Book.deleteOne({ _id: _id }, {}, (err: any) => {
            if (err) return res.status(500).send(err)
            res.status(200).send({ message: 'book deleted' })
          })
        } catch (e) {
          res.status(500).send({ message: 'invalid bookId' })
        }
    },

    findByCategory: async (req: Request, res: Response): Promise<void> => {
        const { category } = <FindByCategory>(<unknown>req.params)
        const query = category? {bookcategory: category} : {}
        Book.find(query, (err: any, data: any) => {
            if (err) return res.status(500).send({ message: 'Error in finding books by category'})
            res.status(200).send(data)
          })
    },

    search: async(req: Request, res: Response): Promise<void> => {
        const {name, author} = <Search>(<unknown>req.body)
        var query;
        if(name && author){
            query = {name: name, author: author}
        }
        else if(name){
            console.log(req.body)
            query = {name: name}
        }
        else if(author){
            console.log(req.body)
            query = {author: author}
        }
        else query = {}
        Book.find(query, (err: any, data: any) => {
            if(err){
                return res.status(500).send({message: "Error finding the books"})
            }
            res.status(200).send(data)
        })
    },
    advancedSearch: async (req: Request, res: Response) => {
        console.log(req.body)
        const {name, price, category} = <AdvancedSearch>(<unknown>req.body)
        console.log(name)
        if(!name || !price || !category){
            res.status(404).send({message: "Book name and price must be entered"})
        }
        const query = {name: name, price: price, category: category}
        Book.find(query, (err: any, data: any) => {
            if(err){
                return res.status(500).send({message: "Error finding the books"})
            }
            res.status(200).send(data)
        })
    },
}

export default BookController


