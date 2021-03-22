import mongoose from 'mongoose'
import idValidator from 'mongoose-id-validator'

// Cart and User is 1 to 1 relation
const Cart = new mongoose.Schema({
  // _id: {type:ObjectId, required:true} this will be generated automatically
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
})

// to validate reference id exist in the reference model
Cart.plugin(idValidator)

export default mongoose.model('Cart', Cart)
