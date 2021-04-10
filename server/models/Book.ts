import mongoose from 'mongoose'

const Book = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  price: { type: String },
  tradeOption: { type: String },
  author: { type: String },
  category: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now() },
  condition: { type: String },
  reviews: [
    {
      _id: { type: mongoose.Types.ObjectId },
      by: {
        _id: { type: mongoose.Types.ObjectId },
        username: { type: String },
        firstname: { type: String },
        lastname: { type: String },
      },
      content: { type: String },
    },
  ],
  img: { type: String },
})

export default mongoose.model('Book', Book)
