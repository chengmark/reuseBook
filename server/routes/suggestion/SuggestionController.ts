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
    for (let i = 0; i < interestIds.length; i++) {
      if (maxInt >= 2) if (!selections[interestIds[i]]) selections[interestIds[i]] = 2
      maxInt -= 2
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

    if (books.length < parseInt(max)) {
      const remBooks = await Book.aggregate([{ $sample: { size: parseInt(max) - books.length } }])
      await Category.populate(remBooks, { path: 'category' })
      await Review.populate(remBooks, { path: 'reviews' })
      await User.populate(remBooks, { path: 'sellerId' })
      books = books.concat(remBooks)
    }
    res.status(200).send(books)
  },
}

export default SuggestionController
