import { Request, Response } from 'express'
import { RecordTransaction, ListTransactions, ListBuying, ListSelling } from './params'
import mongoose from 'mongoose'
import Transaction from '../../models/Transaction'

/*
This is used to store the transaction that will be made via our system. When seller accept the offer
of particular buyer, the transaction will be recorded in database. 
*/

const TransactionController = {

  // record the transaction in database

  // create a new transaction

  recordTransaction: async (req: Request, res: Response): Promise<void> => {
    const newTransaction = <RecordTransaction>(<unknown>req.body)

    Transaction.create(newTransaction, (err: any, data: any) => {
      if (err) {
        return res.status(500).send({ message: 'error recording transaction' })
      }
      res.status(200).send(data)
    })
  },


  // list all the transactions store in database

  // list all transactions

  listTransactions: async (req: Request, res: Response): Promise<void> => {
    const { status } = <ListTransactions>(<unknown>req.body)
    const query = status ? { status: status } : {}

    Transaction.find(query)
      .sort({ createdAt: -1 })
      .exec((err, data) => {
        if (err) {
          return res.status(500).send({ message: 'error listing all transactions' })
        }
        res.status(200).send(data)
      })
  },


  // list all transactions for a user in which he was a buyer

  // list transactions of a buyer

  listBuying: async (req: Request, res: Response): Promise<void> => {
    const { userId } = <ListBuying>(<unknown>req.params)
    const _id = mongoose.Types.ObjectId(userId)

    Transaction.find({ buyer: _id })
      .sort({ createdAt: -1 })
      .exec((err, data) => {
        if (err) {
          return res.status(500).send({ message: 'error listing buying history of user' })
        }
        res.status(200).send(data)
      })
  },


  // list all transactions for a user in which he was a seller

  // list transactions of a seller

  listSelling: async (req: Request, res: Response): Promise<void> => {
    const { userId } = <ListSelling>(<unknown>req.params)
    const _id = mongoose.Types.ObjectId(userId)

    Transaction.find({ seller: _id })
      .sort({ createdAt: -1 })
      .exec((err, data) => {
        if (err) {
          return res.status(500).send({ message: 'error listing selling history of user' })
        }
        res.status(200).send(data)
      })
  },
}

export default TransactionController
