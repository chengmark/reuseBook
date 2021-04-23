import { Request, Response, Router } from 'express'
import { Routes } from '..'
import OfferController from './OfferController'

// routes for offer related operations
export class OfferRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'AWSRoutes')
  }

  configureRoutes(): void {
    this.router
      .route('/offer')
      .post((req: Request, res: Response) => {
        OfferController.createOffer(req, res)
      })
      .delete((req: Request, res: Response) => {
        OfferController.deleteOffer(req, res)
      })

    this.router.route('/offer/:sellerId').get((req: Request, res: Response) => {
      OfferController.listOfferBySeller(req, res)
    })
  }
}
