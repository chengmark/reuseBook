import mongoose from 'mongoose'

const Review = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now() },
})

export default mongoose.model('Review', Review)
