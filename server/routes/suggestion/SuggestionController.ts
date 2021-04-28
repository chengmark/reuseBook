import { Request, Response } from 'express'
import Book from '../../models/Book'
import { ListSuggestions } from './params'
import Category from '../../models/Category'
import Review from '../../models/Review'
import User from '../../models/User'

const SuggestionController = {
  // suggest the book according to interestIDs array
  suggest: async (req: Request, res: Response): Promise<any> => {
    const { interestIds, max, exclude } = <ListSuggestions>(<unknown>req.body)
    let maxInt = parseInt(max) // maximum number of books to output
    console.log('ids length: ', interestIds.length)
    console.log(exclude)
    const selections = {} // store number of books for particular interest

    // if the interest array is empty, then return random books
    if (interestIds.length < 1) {
      const books = await Book.aggregate([{ $sample: { size: maxInt } }])
      await Category.populate(books, { path: 'category' })
      await Review.populate(books, { path: 'reviews' })
      await User.populate(books, { path: 'sellerId' })
      return res.status(200).send(books)
    }

    // the interest array is not empty, then fetch the books from database and store it into books array

    let books: Array<any> = []
    let randomIds: Array<string> = [] // randomised IDs to fetch random books for given interestIDs

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
