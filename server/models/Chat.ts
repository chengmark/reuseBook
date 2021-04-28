import mongoose from 'mongoose'

/*
Chat Model
name // name of chat room
users // users of chat room
messages // messages of chat room
book // which book it belongs to
*/

const Chat = new mongoose.Schema({
  name: { type: String },
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
  book: { type: mongoose.Types.ObjectId, ref: 'Book' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Chat', Chat)
