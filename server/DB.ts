import mongoose from 'mongoose'

const URL = 'mongodb://localhost:27017/csci3100'

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
