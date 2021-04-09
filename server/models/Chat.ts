import mongoose from 'mongoose'

const Chat = new mongoose.Schema(
  {
    name: { type: String },
    Id: { type: String },
    users: [{ type: String }],
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: { createdAt: 'createdAt' } },
)

export default mongoose.model('Chat', Chat)
