import express, { Request, Response } from 'express'
import { Routes } from '..'
import passport, { session } from 'passport'

// routes for authentication related operations
// get /auth/strategy will start authenticating through [strategy] api
// after authentication it send the callback path
// and we are redirecting it to our site
const CALLBACK_PATH = '/user'

export class AuthRoutes extends Routes {
  constructor(router: express.Router) {
    super(router, 'AuthRoutes')
  }

  configureRoutes(): void {
    // facebook authentication
    this.router.route(`/auth/facebook`).get(passport.authenticate('facebook'))
    this.router
      .route(`/auth/facebook/callback`)
      .get(passport.authenticate('facebook'), (req: Request, res: Response): void => {
        res.redirect(CALLBACK_PATH)
      })

    // github authentication
    this.router.route('/auth/github').get(passport.authenticate('github'))
    this.router
      .route('/auth/github/callback')
      .get(passport.authenticate('github'), (req: Request, res: Response): void => {
        res.redirect(CALLBACK_PATH)
      })

    // google authentication
    this.router.route('/auth/google').get(
      passport.authenticate('google', {
        scope: ['profile', 'email'],
      }),
    )
    this.router
      .route('/auth/google/callback')
      .get(passport.authenticate('google'), (req: Request, res: Response): void => {
        if (req.session) req.session.loggedIn = true
        console.log(req.sessionID)
        res.redirect(CALLBACK_PATH)
      })

    this.router.route('/auth/check').get((req: Request, res: Response) => {
      console.log(req.sessionID)
      res.json({ loggedIn: req.session.loggedIn, test: 'test' })
    })
  }
}
