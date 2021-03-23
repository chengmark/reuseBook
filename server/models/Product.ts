import mongoose from 'mongoose'
import idValidator from 'mongoose-id-validator'

const Product = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', require: true },
})

Product.plugin(idValidator)

export default mongoose.model('Product', Product)
