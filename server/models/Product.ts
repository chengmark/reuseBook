import mongoose from 'mongoose'
const Product = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
})

export default mongoose.model('Product', Product)
