import { Request, Response, Router } from 'express'
import { Routes } from '..'
import AwsController from './AwsController'

// routes for user related operations
export class AWSRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'AWSRoutes')
  }

  configureRoutes(): void {
    this.router.route('/sign-s3').post((req: Request, res: Response) => {
      AwsController.signS3(req, res)
    })
  }
}
