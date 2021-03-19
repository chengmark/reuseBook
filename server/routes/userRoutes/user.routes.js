module.exports = UserRoutes => {
    const users = require('../controllers/user.controller.js');
    var router = require('express').Router();

    // create new user
    router.post('/registration', users.create);

    //find one user
    router.get('/:id', users.findOne);

    //delete a user
    router.delete('/:id', users.delete);

    UserRoutes.use('/users', router);

};
