import { Request, Response } from 'express'
import Category from '../../models/Category'
import { GetCategory } from './params'
import mongoose from 'mongoose'

const CategoryController = {
  // get all products of a user
  listCategories: async (req: Request, res: Response): Promise<void> => {
    Category.find({}, (err, docs) => {
      if (err) res.status(500).send({ message: 'Error in getting categories' })
      res.status(200).send(docs)
    })
  },
  // get category by category id
  getCategory: async (req: Request, res: Response): Promise<void> => {
    const { categoryId } = <GetCategory>(<unknown>req.params)
    const _id = mongoose.Types.ObjectId(categoryId)
    Category.find({ _id: _id }, (err, data) => {
      if (err) {
        return res.status(500).send({ message: 'error finding the category' })
      }
      res.status(200).send(data)
    })
  },
}

export default CategoryController
