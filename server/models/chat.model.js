const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    type: {
        type: String
    },
    body: {
        type: String
    },
    author: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

/** Actual chat schema */
const chatsSchema = new mongoose.Schema({
    id: Number,
    user1: String,
    user2: String,
    messages: [messageSchema]
});

chatSchema.method("toJSON", function() {
    const{ __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})


module.exports = mongoose.model('Chat', chatSchema)
