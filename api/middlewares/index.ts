import { Router } from 'express'
import passport from 'passport'
import session from 'express-session'

const middlewares = Router()

middlewares.use(passport.initialize())
middlewares.use(passport.session())

const ONE_DAY = 86400000
const ONE_WEEK = ONE_DAY * 7
const ONE_MONTH = ONE_DAY * 30
const ONE_YEAR = ONE_DAY * 365

middlewares.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    // doc of set-cookie header
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
    cookie: {
      maxAge: ONE_WEEK,
      // if true, then cookie whill only sent to server with https://
      // secure: true
      // corss-site requests not allowed, but nevigation from external link is allowed
      sameSite: 'lax',
    },
  }),
)

export default middlewares
