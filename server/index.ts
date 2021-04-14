require('dotenv').config()
import express, { Request, Response } from 'express'
import http from 'http'
import { Routes } from './routes'
import { UserRoutes } from './routes/user'
import { CategoryRoutes } from './routes/category'
import { ChatRoutes } from './routes/chat'
import { BookRoutes } from './routes/book'
import { SuggestionRoutes } from './routes/suggestion'

import { ReviewRoutes } from './routes/review'
import { TransactionRoutes } from './routes/transaction'
import { AWSRoutes } from './routes/aws'
import { SearchRoutes } from './routes/searchBar'
// import { AuthRoutes } from './routes/auth'
// import initPassport from './authentication'
import middlewares from './middlewares'
import path from 'path'
import DB from './DB'
import initDB from './InitDB'
import socket from './socket'

export const app: express.Application = express()
const server: http.Server = http.createServer(app)
const PORT = process.env.PORT ? process.env.PORT : 3002

socket(server)

// use middlewares
app.use(middlewares)
// initPassport()

const routes: Array<Routes> = []
const router = express.Router()
// create user routes to the router
routes.push(new UserRoutes(router))
routes.push(new CategoryRoutes(router))
routes.push(new BookRoutes(router))
routes.push(new ChatRoutes(router))
routes.push(new SuggestionRoutes(router))
routes.push(new SearchRoutes(router))
routes.push(new ReviewRoutes(router))
routes.push(new AWSRoutes(router))
routes.push(new TransactionRoutes(router))
// create auth routes to the router
// routes.push(new AuthRoutes(router))

// all routes start with '/api'
app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../build')))
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../', 'build', 'index.html'))
  })
} else {
  app.use(express.static(path.join(__dirname, '../build')))
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../', 'build', 'index.html'))
  })
}

DB.connect()
if (process.env.NODE_ENV === 'testing') {
  server.listen(process.env.TESTING_PORT, () => {
    console.log(`Server running on port: ${PORT}`)
    console.log(`end point at /api`)
    routes.forEach((routes: Routes) => {
      console.log(`Routes configured for ${routes.getName()}`)
    })
  })
} else {
  initDB().then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
      console.log(`end point at /api`)
      routes.forEach((routes: Routes) => {
        console.log(`Routes configured for ${routes.getName()}`)
      })
    })
  })
}
