import express, { Request, Response } from 'express'
import { Routes } from '..'
const SuggestionController = require('./SuggestionController')
class SuggestionRoutes extends Routes {
  constructor(router = express.Router) {
    super(router, 'SuggestionRoutes')
  }
  configureRoutes() {
    this.router.route(`/listSuggestions`).post(async (req, res) => {
      SuggestionController.Suggest(req, res)
    })
  }
}
module.exports = SuggestionRoutes
