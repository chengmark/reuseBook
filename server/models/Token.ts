import mongoose from 'mongoose'

const Token = new mongoose.Schema({
  // _id: {type:ObjectId, required:true} this will be generated automatically
  type: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return v == 'resetPw'
      },
      message: (props) => `${props.value} is not a valid type`,
    },
  },
  tokenId: { type: String, require: true }, // hash(refId, Date.now)
  refId: { type: mongoose.Types.ObjectId, require: true }, // for updating this reference
  createdAt: { type: Date, expires: 600, default: Date.now }, // expire in seconds
})

export default mongoose.model('Token', Token)
