import express, { Request, Response } from 'express'
import { Routes } from '..'
const SearchController = require('./SearchController')

export class SearchRoutes extends Routes {
  constructor(router = express.Router) {
    super(router, 'SearchRoutes')
  }
  configureRoutes() {
    this.router.route(`/search`).post(async (req, res) => {
      SearchController.Search(req, res)
    })
  }
}
module.exports = SearchRoutes
