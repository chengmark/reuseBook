import { Request, Response } from 'express'
import Category from '../../models/Category'

const CategoryController = {
  // get all products of a user
  listCategories: async (req: Request, res: Response): Promise<void> => {
    Category.find({}, (err, docs) => {
      if (err) res.status(500).send({ message: 'Error in getting categories' })
      res.status(200).send(docs)
    })
  },
}

export default CategoryController
