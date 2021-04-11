import { Request, Response } from 'express'
import {
    RecordTransaction,
    ListTransactions,
    ListBuying,
    ListSelling,
} from './params'
import mongoose from 'mongoose'
import Transaction from '../../models/Transaction'

const TransactionController = {
    
    recordTransaction: async (req: Request, res: Response): Promise<void> => {
        const newTransaction = <RecordTransaction>(<unknown>req.body)

        Transaction.create(newTransaction, (err: any, data: any) => {
            if(err){
                return res.status(500).send({message: 'error recording transaction'})
            }
            res.status(200).send(data)
        })
    },

    listTransactions: async (req: Request, res: Response): Promise<void> => {
        const { status } = <ListTransactions>(<unknown>req.body)
        const query = status ? { status: status } : {}

        Transaction.find(query).sort({createdAt: -1}).exec((err, data) => {
            if(err){
                return res.status(500).send({message: 'error listing all transactions'})
            }
            res.status(200).send(data)
        })
    },

    listBuying: async (req: Request, res: Response): Promise<void> => {
        const { userId } = <ListBuying>(<unknown>req.params)
        const _id = mongoose.Types.ObjectId(userId)

        Transaction.find({ buyer: _id }).sort({createdAt: -1}).exec((err, data) => {
            if(err){
                return res.status(500).send({message: 'error listing buying history of user'})
            }
            res.status(200).send(data)
        })
    },
    
    listSelling: async (req: Request, res: Response): Promise<void> => {
        const { userId } = <ListSelling>(<unknown>req.params)
        const _id = mongoose.Types.ObjectId(userId)

        Transaction.find({ seller: _id }).sort({ createdAt: -1 }).exec((err, data) => {
            if(err){
                return res.status(500).send({message: 'error listing selling history of user'})
            }
            res.status(200).send(data)
        })
    },

}

export default TransactionController
