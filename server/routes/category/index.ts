import { Request, Response, Router } from 'express'
import { Routes } from '..'
import CategoryController from './CategoryController'

// routes for category related operations
export class CategoryRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'Category')
  }
  configureRoutes() {
    this.router.route(`/category`).get((req: Request, res: Response) => {
      CategoryController.listCategories(req, res)
    })

    this.router.route('/category/:categoryId').get((req: Request, res: Response) => {
      CategoryController.getCategory(req, res)
    })
  }
}
