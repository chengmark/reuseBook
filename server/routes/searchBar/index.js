import express, { Request, Response } from 'express'
import { Routes } from '..'
const Search = require('./SearchController')
class SearchRoutes extends Routes {
  constructor(router = express.Router) {
    super(router, 'SearchRoutes')
  }
  configureRoutes() {
    this.router
      .route(`/search/:searchTitle`)
      .get(async (req, res) => {
        Search.normal(req,res);
        //res.send(Search.normal(req,res))
      })
  }
}
module.exports=SearchRoutes
