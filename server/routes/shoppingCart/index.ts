import { Request, Response, Router } from 'express'
import { Routes } from '..'
import CartController from './CartController'

export class CartRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'CartRoutes')
  }
  configureRoutes() {
    this.router
      .route(`/cart`)
      .get((req: Request, res: Response) => {
        CartController.listUserProduct(req, res)
      })
      .post((req: Request, res: Response) => {
        CartController.addProduct(req, res)
      })
  }
}
