import { Request, Response, Router } from 'express'
import { Routes } from '..'
import SearchController from './SearchController'

// API for search related operations
export class SearchRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'SearchRoutes')
  }
  configureRoutes(): void {
    this.router.route(`/search`).post(async (req, res) => {
      SearchController.search(req, res)
    })
  }
}
