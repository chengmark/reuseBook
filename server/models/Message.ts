import mongoose from 'mongoose'

const Message = new mongoose.Schema(
  {
    body: { type: String },
    author: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'createdAt' } },
)

export default mongoose.model('Message', Message)
