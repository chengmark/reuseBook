import mongoose from 'mongoose'

/* This is the book model we use
  name // Book Name
  type // sell or trade
  price // book price
  tradeOption // Which book the seller want to trade with
  author // author of book
  category // category of the book
  condition // new or used
*/

const Book = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  price: { type: String },
  tradeOption: { type: String },
  author: { type: String },
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  condition: { type: String },
  reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
  img: { type: String },
  sellerId: { type: mongoose.Types.ObjectId, ref: 'User' },
  contact: { type: String },
})

export default mongoose.model('Book', Book)
