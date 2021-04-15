import mongoose from 'mongoose'

export const MONGODB_URL = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/csci3100'

const DB = {
  connect: (): void => {
    mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    const db = mongoose.connection

    db.on('error', (err) => {
      console.log(err)
    })

    db.once('open', () => {
      console.log('mongoDB connected')
    })
  },
}

export default DB
