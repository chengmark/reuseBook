import express, { Request, Response } from 'express'
import http from 'http'
import { Routes } from './routes'
import { UserRoutes } from './routes/user'
import { CartRoutes } from './routes/shoppingCart'
import { CategoryRoutes } from './routes/category'
// import { AuthRoutes } from './routes/auth'
// import initPassport from './authentication'
import middlewares from './middlewares'
import path from 'path'
import DB from './DB'
import initDB from './InitDB'

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const PORT = process.env.PORT ? process.env.PORT : 3002

// use middlewares
app.use(middlewares)
// initPassport()

const routes: Array<Routes> = []
const router = express.Router()

// create user routes to the router
routes.push(new UserRoutes(router))
routes.push(new CartRoutes(router))
routes.push(new CategoryRoutes(router))
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

initDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
    console.log(`end point at /api`)
    routes.forEach((routes: Routes) => {
      console.log(`Routes configured for ${routes.getName()}`)
    })
  })
})
