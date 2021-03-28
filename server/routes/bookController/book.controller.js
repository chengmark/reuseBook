const db = require('../models');
const Book = db.books;
var multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });


// when a user wants to post an ad to sell a book, at the end when all information is filled, 
// a book objected will be created and stored in database
exports.create = (req, res) => {
    var condition = !req.body.bookName || !req.body.price || !req.body.file
    if(condition){
        res.status(400).send({message: "The * fields cannot be empty"})
        return
    }

    // params of a model
    const book = new Book({
        bookName: req.body.bookName,
        bookAuthor: req.body.bookAuthor,
        price: req.body.price,
        category: req.body.category,
        available: true,
        forSell: true,
        forExchange: true,
        status: req.body.status,
        image: {
            name: req.body.bookName,
            desc: req.body.bookName + '-' + req.body.bookAuthor,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
    })
    book
        .save(book)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while creating book object"
            })
        })
};

//this is when a user clicks on particular category, all books from the collection will be fetched
exports.findAllByCategory = (req, res) => {
    const name = req.query.category
    
    Book.find({category: name})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while finding the books by category"
            })
        })
};

// this is when a buyer clicks the book to buy it
exports.findOne = (req, res) => {
    var id = req.params.id;

    Book.findById(id)
        .then(data => {
            if(!data)
                res.status(500).send({message: "No such book"})
            else
                res.send(data)
        })
        .catch(err => {
            res.status(500).send({message: "Error retrieving record"})
        })
};

// an admin can delete the whole category of books
exports.deleteAllByCategory = (req, res) => {
    const name = req.body.category;
    
    Book.remove({category: name})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while deleting the books by category"
            })
        })
};

// when a user uses advanced search option, set of books will be returned
exports.advancedSearch = (req, res) => {
   var name = req.body.bookName;
   var author = req.body.author;
   var suggestedPrice = req.body.price;

   if(!bookName || !author || !suggestedPrice){
       res.status(400).send({message: "You must enter * fields"})
       return;
   }

       Book.find({$and: [{bookName: name}, {bookAuthor: author}, {price: {$lte: suggestedPrice}}]})
            .then(data =>{
                if(!data){
                    res.send({message: "No books available with given constraints"})
                }
                else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({message: "Error occured"})
            })       
}

// when a user types his query, based on query all books with bookNames have a subtring which user typed,
// all such books will be returned
exports.search = (req, res) => {
    var title = req.body.searchTitle;
    if(!title){
        return res.status(400).send({message: "Enter something"})
    }
    db.books.find({bookName: {$regex: new RegExp(title), $options: "i"} })
        .then(data => {
            if(!data)
                res.send({message: "No records"})
            else
               res.send(data)
        })
        .catch(err => {
            res.status(500).send({message: "Some Error occured"})
        })
}


