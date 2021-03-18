const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    },
    items:[{
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
});
let Cart = mongoose.model("Cart", CartSchema)
module.exports=Cart;