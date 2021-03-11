import mongoose from 'mongoose'

const user = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  // add more if any...
})

export default mongoose.model('User', user)
