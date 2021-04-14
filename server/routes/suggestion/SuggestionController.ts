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
    for (let i = 0; max > 0; max--) {
      const interest = JSON.stringify(interests[Math.floor(Math.random() * interests.length)])
      if (!selections[interest]) selections[interest] = 0
      selections[interest] += 1
    }
    //console.log(selections)
    const books: Array<any> = []
    for (const key of Object.keys(selections)) {
      const count = selections[key]
      const category = JSON.parse(key)
      const booksOfCategory = await Book.find({ category: category._id }).exec()
      //console.log(booksOfCategory)
      if (booksOfCategory) {
        if (booksOfCategory.length > count) {
          books.push(booksOfCategory.slice[(0, count)])
        } else books.push(booksOfCategory)
      }
    }
    return res.status(200).send(books)
  },
}

export default SuggestionController
