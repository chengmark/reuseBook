module.exports = app => {
    const books = require('../controllers/book.controller');
    var router = require('express').Router();
    var multer = require('multer')
    var upload = multer({dest: 'uploads/'});

    router.post('/createBook', upload.single('image'), books.create);

    router.get('/findByCategory', books.findAllByCategory);

    router.get('/:id', books.findOne);

    router.delete('/delete', books.deleteAllByCategory)

    router.get('/search', books.search)

    router.post('/advanceSearch', books.advancedSearch)

    app.use('/api/books', router);
}
