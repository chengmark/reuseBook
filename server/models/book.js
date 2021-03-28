const mongoose = require("mongoose");

// image schema to store the image of the book
const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const bookSchema = mongoose.Schema({
        bookName: String,
        bookAuthor: String,
        price: String,
        category: String,
        available: Boolean,
        forSell: Boolean,
        forExchange: Boolean,
        status: String,
        reviews: [String],
        ratings: [Number],
        bookImage: imageSchema
        },
        {timestamps: true}
    );
    bookSchema.method("toJSON", function() {
        const{ __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

module.exports = mongoose.model('Book', bookSchema)
  
