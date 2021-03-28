module.exports = app => {
    const chats = require('../controllers/chat.controller');
    var router = require('express').Router();

    router.post('/createChatRoom', chats.create);

    router.post('/:id/messages', chats.addMessage);

    app.use('/api/chats', router);
}
