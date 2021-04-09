import express, { Request, Response } from 'express'
import { Routes } from '..'
const Search = require('./SearchController')
class SearchRoutes extends Routes {
  constructor(router = express.Router) {
    super(router, 'SearchRoutes')
  }
  configureRoutes() {
    this.router.route(`/search/:searchTitle`).get(async (req, res) => {
      /*if (req.type=="book")
        {
          Search.Book(req,res);
        }
        else*/
      Search.Category(req, res)
    })
  }
}
module.exports = SearchRoutes
