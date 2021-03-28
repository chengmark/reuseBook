const db = rquire('../models');
const Chat = db.chats;


exports.create = (req, res) => {
    const chat = new Chat({
        id: req.body.id,
        user1: req.body.user1,
        user2: req.body.user2,
    })
    chat
        .save(chat)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({message: 'Error while creating chat'})
        })
}

exports.addMessage = (req, res) => {
    const chatMessage = {
        messages: {
            type: request.body.type,
            body: request.body.body,
            author: request.body.author
        }
    };
    try {
        const id = mongoose.Types.ObjectId(request.params.id);
        const dbResp = await Chats.findOneAndUpdate({ "_id": id }, { $push: chatMessage }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            response.status(201).json(chatMessage);
        } else {
            response.status(400).json({ message: 'Not able to update messages' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
