import { Request, Response } from 'express'
import Book from '../../models/Book'

type Suggest = {
  interestIds: Array<string>
  max: number
  exclude: string // book id
}

const SuggestionController = {
  suggest: async (req: Request, res: Response): Promise<any> => {
    const { interestIds, max, exclude } = <Suggest>(<unknown>req.body)
    const selections = {}

    if (interestIds.length < 1) {
      return res.status(200).send(
        await Book.find({ _id: { $ne: exclude } })
          .populate('sellerId')
          .populate('category')
          .populate('reviews')
          .limit(max)
          .exec(),
      )
    }
    for (let i = max; i > 0; i--) {
      const interestId = interestIds[Math.floor(Math.random() * interestIds.length)]
      if (!selections[interestId]) selections[interestId] = 0
      selections[interestId] += 1
    }
    let books: Array<any> = []
    Object.keys(selections).forEach(async (interestId, count) => {
      const booksOfCategory = await Book.find({ category: interestId, _id: { $ne: exclude } })
        .populate('category')
        .populate('reviews')
        .limit(count)
        .exec()
      if (booksOfCategory) {
        books = books.concat(booksOfCategory)
      }
    })
    if (books.length < max) {
      const otherBooks = await Book.find({ category: { $nin: Object.keys(selections) }, _id: { $ne: exclude } })
        .populate('category')
        .populate('reviews')
        .limit(max - books.length)
        .exec()
      console.log(Object.keys(selections))
      books = books.concat(otherBooks)
    }
    return res.status(200).send(books)
  },
}

export default SuggestionController
