import { Router } from 'express'
// // import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import MongoStore from 'connect-mongo'
import { MONGODB_URL } from '../DB'
import { ONE_DAY } from '../utils'

const middlewares = Router()
const SESSION_SECRET = process.env.SESSION_SECRET || 'aisooi'
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'psjga'
// // middlewares.use(passport.initialize())
// // middlewares.use(passport.session())

middlewares.use(cookieParser(COOKIE_SECRET))
middlewares.use(bodyParser.urlencoded({ extended: false }))
middlewares.use(bodyParser.json())
middlewares.use(cors({ origin: process.env.ORIGIN, credentials: true }))

middlewares.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-   Type, Accept, Authorization')
  next()
})

middlewares.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGODB_URL }),
    // doc of set-cookie header
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
    cookie: {
      path: '/',
      maxAge: ONE_DAY,
      httpOnly: true,
      // if true, then cookie will only sent to server with https://
      secure: process.env.NODE_ENV == 'production' ? true : false,
      // corss-site requests not allowed, but nevigation from external link is allowed
      sameSite: 'lax',
    },
  }),
)

export default middlewares
