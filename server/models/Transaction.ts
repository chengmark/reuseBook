import mongoose from 'mongoose'

const Transaction = new mongoose.Schema(
    {
        buyer: { type: mongoose.Types.ObjectId, ref: 'User' },
        seller: { type: mongoose.Types.ObjectId, ref: 'User' },
        bookname: { type: String},
        bookauthor: { type: String },
        bookprice: { type: String, default: '' },
        category: {type: mongoose.Types.ObjectId, ref: 'Category'},
        description: { type: String },
        createdAt: { type: Date, default: Date.now },

    }
)

export default mongoose.model('Transaction', Transaction)
