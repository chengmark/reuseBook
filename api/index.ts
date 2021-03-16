import express, { Request, Response } from 'express'
import bodyparser from 'body-parser'
import http from 'http'
import { Routes } from './routes'
import { UserRoutes } from './routes/user'
import { AuthRoutes } from './routes/auth'
// import initPassport from './authentication'
import middlewares from './middlewares'
import path from 'path'

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const PORT = process.env.PORT ? process.env.PORT : 3001
const routes: Array<Routes> = []

// initPassport()

app.use(bodyparser.json())

const router = express.Router()

// create user routes to the router
routes.push(new UserRoutes(router))

// create auth routes to the router
routes.push(new AuthRoutes(router))

// use middlewares
app.use(middlewares)

// all routes start with '/api'
app.use('/api', router)

// app.get('/', (req: Request, res: Response) => {
//   if(!req.session.logedin)
// })

app.use(express.static(path.join(__dirname, '..', 'build')))
app.use(express.static('public'))

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(`end point at /api`)
  routes.forEach((routes: Routes) => {
    console.log(`Routes configured for ${routes.getName()}`)
  })
})
