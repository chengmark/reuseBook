import { Request, Response, Router } from 'express'
import { Routes } from '..'
import BookController from './BookController'

// routes for user related operations
export class BookRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'BookRoutes')
  }

  configureRoutes(): void {
    this.router.route('/books/search').post((req: Request, res: Response) => {
      BookController.search(req, res)
    })

    this.router.route('/books/search/:pageNo/:pageSize').get((req: Request, res: Response) => {
      BookController.pagination(req, res)
    })

    this.router.route('/books/advancedsearch').post((req: Request, res: Response) => {
      BookController.advancedSearch(req, res)
    })

    this.router
      .route('/books')
      .post((req: Request, res: Response) => {
        BookController.createBook(req, res)
      })
      .get((req: Request, res: Response) => {
        BookController.listBooks(req, res)
      })

    this.router
      .route('/books/:bookId')
      .delete((req: Request, res: Response) => {
        BookController.deleteBook(req, res)
      })
      .get((req: Request, res: Response) => {
        BookController.getBook(req, res)
      })
    this.router
      .route('/books/:categoryId')
      .delete((req: Request, res: Response) => {
        BookController.deleteByCategory(req, res)
      })
      .get((req: Request, res: Response) => {
        BookController.listByCategory(req, res)
      })
  }
}
