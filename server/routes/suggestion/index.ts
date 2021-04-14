import { Request, Response, Router } from 'express'
import { Routes } from '..'
import SuggestionController from './SuggestionController'

export class SuggestionRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'listSuggestions')
  }
  configureRoutes(): void {
    this.router.route(`/search`).post(async (req, res) => {
      SuggestionController.suggest(req, res)
    })
  }
}
