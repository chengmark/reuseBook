import mongoose from 'mongoose'

const Chat = new mongoose.Schema(
    {
        name: {type: String},
        users: [{type: mongoose.Types.ObjectId, ref: 'User'}],
        messages: [{type: mongoose.Types.ObjectId, ref: 'Message'}],
    },
    {timestamps: {createdAt: 'createdAt'}},
)

export default mongoose.model('Chat', Chat)
