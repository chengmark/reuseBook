import { Request, Response } from 'express'
import Book from '../../models/Book'
import { ListSuggestions } from './params'
import Category from '../../models/Category'
import Review from '../../models/Review'
import User from '../../models/User'

const SuggestionController = {
  suggest: async (req: Request, res: Response): Promise<any> => {
    const { interestIds, max, exclude } = <ListSuggestions>(<unknown>req.body)
    let maxInt = parseInt(max)
    console.log('ids length: ', interestIds.length)
    console.log(exclude)
    const selections = {}

    if (interestIds.length < 1) {
      const books = await Book.aggregate([{ $sample: { size: maxInt } }])
      await Category.populate(books, { path: 'category' })
      await Review.populate(books, { path: 'reviews' })
      await User.populate(books, { path: 'sellerId' })
      return res.status(200).send(books)
    }

    let books: Array<any> = []
    let randomIds: Array<string> = []

    while (maxInt > 0) {
      randomIds.push(interestIds[Math.floor(Math.random() * interestIds.length)])
      maxInt -= 1
    }
    console.log(randomIds)
    for (let i = 0; i < parseInt(max); i++) {
      if (!selections[randomIds[i]]) {
        selections[randomIds[i]] = 0
      }
      selections[randomIds[i]] += 1
    }

    const ids = Object.keys(selections)
    for (let i = 0; i < ids.length; i++) {
      const book = await Book.find({ category: ids[i], _id: { $ne: exclude } })
        .populate('category')
        .populate('reviews')
        .populate('sellerId')
        .limit(selections[ids[i]])
        .exec()
      books = books.concat(book)
    }

    res.status(200).send(books)
  },
}

export default SuggestionController
