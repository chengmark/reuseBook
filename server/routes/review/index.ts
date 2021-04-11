import { Request, Response, Router } from 'express'
import { Routes } from '..'
import ReviewController from './ReviewController'

// routes for user related operations
export class ReviewRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'ReviewRoutes')
  }

  configureRoutes(): void {

    this.router
    .route('/books/:bookId/reviews')
    .post((req: Request, res: Response) => {
        ReviewController.createReview(req, res)
    })
    .get((req: Request, res: Response) => {
        ReviewController.listReviews(req, res)
    })
    .delete((req: Request, res: Response) => {
        ReviewController.deleteReviews(req, res)
    })

    this.router
    .route('/books/:bookId/reviews/:reviewId/edit')
    .post((req: Request, res: Response) => {
        ReviewController.editReview(req, res)
    })

    this.router
    .route('/books/:bookId/reviews/:reviewId')
    .get((req: Request, res: Response) => {
        ReviewController.getReview(req, res)
    })
    .delete((req: Request, res: Response) => {
        ReviewController.deleteReview(req, res)
    })

    this.router
    .route('/books/:bookId/reviews/:reviewId/user')
    .get((req: Request, res: Response) => {
        ReviewController.getUser(req, res)
        })

    }   
}


