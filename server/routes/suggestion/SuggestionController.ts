import { Request, Response } from 'express'
import Book from '../../models/Book'
import { ListSuggestions } from './params'
import Category from '../../models/Category'
import Review from '../../models/Review'
import User from '../../models/User'

const SuggestionController = {
  suggest: async (req: Request, res: Response): Promise<any> => {
    const { interestIds, max, exclude } = <ListSuggestions>(<unknown>req.body)
    var maxInt = parseInt(max)
    console.log(interestIds.length)
    console.log(interestIds)
    console.log(maxInt)
    console.log(exclude)
    const selections = {}

    if (interestIds.length < 1) {
      console.log('The interest id is ' + interestIds.length)
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

    let ids = Object.keys(selections)
    for (let i = 0; i < ids.length; i++) {
      console.log('id is ' + ids[i])
      const book = await Book.find({ category: ids[i], _id: { $ne: exclude } })
        .populate('category')
        .limit(selections[ids[i]])
        .exec()
      console.log(selections[ids[i]])
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
