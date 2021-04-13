import mongoose from 'mongoose'

const Message = new mongoose.Schema({
  content: { type: String },
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Message', Message)
