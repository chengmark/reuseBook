import mongoose from 'mongoose'

const URL = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/csci3100'

const DB = {
  connect: (): void => {
    mongoose.connect(URL)
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
// csci3100-A6
// LFlzuQXtO30IuCRG

// mongodb+srv://csci3100-A6:LFlzuQXtO30IuCRG@csci3100-southeast-1.r54cz.mongodb.net/csci3100?retryWrites=true&w=majority
