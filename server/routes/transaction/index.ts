import { Request, Response, Router } from 'express'
import { Routes } from '..'
import TransactionController from './TransactionController'

// routes for user related operations
export class TransactionRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'TransactionRoutes')
  }

  configureRoutes(): void {
    this.router
      .route('/transactions')
      .post((req: Request, res: Response) => {
        TransactionController.recordTransaction(req, res)
      })
      .get((req: Request, res: Response) => {
        TransactionController.listTransactions(req, res)
      })

    this.router.route('/transactions/buying/:userId').get((req: Request, res: Response) => {
      TransactionController.listBuying(req, res)
    })

    this.router.route('/transactions/selling/:userId').get((req: Request, res: Response) => {
      TransactionController.listSelling(req, res)
    })
  }
}
