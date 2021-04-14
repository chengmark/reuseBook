import mongoose from 'mongoose'

const Offer = new mongoose.Schema({
  sellerId: { type: mongoose.Types.ObjectId, ref: 'User' },
  buyerId: { type: mongoose.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Types.ObjectId, ref: 'Book' },
  contact: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Offer', Offer)
