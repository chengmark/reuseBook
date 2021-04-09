import mongoose from 'mongoose'

const Message = new mongoose.Schema(
  {
    messagetype: { type: String },
    body: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String },
  },
  { timestamps: { createdAt: 'createdAt' } },
)

export default mongoose.model('Message', Message)
