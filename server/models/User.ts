import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    // _id: {type:ObjectId, required:true} this will be generated automatically
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: {
      type: String,
      required: true,
      validate: {
        // length between 8-32
        validator: (v: string) => {
          return v.length > 32 || v.length < 8
        },
        message: (props) => `${props.value} is not a valid password`,
      },
    },
    status: {
      type: String,
      default: 'pending',
      validate: {
        // status can only be pending or active
        validator: (v: string) => {
          return v == 'pending' || v == 'active'
        },
        message: (props) => `${props.value} is not a valid status`,
      },
    }, // active or pending
    interests: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
  },
  { timestamps: { createdAt: 'createdAt' } },
)

export default mongoose.model('User', User)
