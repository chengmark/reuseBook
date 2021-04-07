import mongoose from 'mongoose'

const Book = new mongoose.Schema(
    {
        name: {type: String},
        author: {type: String},
        price: {type: String},
        category: {type: String},
      
    },
    {timestamps: {createdAt: 'createdAt'}},
)

export default mongoose.model('Book', Book)
