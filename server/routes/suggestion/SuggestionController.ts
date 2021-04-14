import { Request, Response } from 'express'
import Book from '../../models/Book'

type Suggest = {
  interests: Array<string>
  max: number
}

const SuggestionController = {
  suggest: async (req: Request, res: Response): Promise<any> => {
    const { interests } = <Suggest>(<unknown>req.params)
    let { max } = <Suggest>(<unknown>req.params)
    const selections = {}
    //console.log(interests)
    //console.log(max)
    for (; max > 0; max--) {
      const interest = JSON.stringify(interests[Math.floor(Math.random() * interests.length)])
      if (!selections[interest]) selections[interest] = 0
      selections[interest] += 1
    }
    //console.log(selections)
    let books: Array<any> = []
    for (const key of Object.keys(selections)) {
      const count = selections[key]
      const category = JSON.parse(key)
      const booksOfCategory = await Book.find({ category: category._id }).limit(count).exec()
      //console.log(booksOfCategory)
      if (booksOfCategory) {
        books.push(booksOfCategory)
        books = books.concat(booksOfCategory)
      }
    }
    if (books.length < max) {
      const otherBooks = Book.find({ category: { $nin: Object.keys(selections) } })
        .limit(max - books.length)
        .exec()
      books = books.concat(otherBooks)
    }
    return res.status(200).send(books)
  },
}

export default SuggestionController
