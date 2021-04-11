import mongoose from 'mongoose'

const Book = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  price: { type: String },
  tradeOption: { type: String },
  author: { type: String },
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  description: { type: String },
  createdAt: { type: Date, default: Date.now() },
  condition: { type: String },
  reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
  img: { type: String },
})

export default mongoose.model('Book', Book)
