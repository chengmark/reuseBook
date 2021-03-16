import express, { Request, Response } from 'express'
import { Routes } from '..'

// routes for user related operations

export class UserRoutes extends Routes {
  constructor(router: express.Router) {
    super(router, 'UserRoutes')
  }

  configureRoutes(): void {
    this.router
      .route(`/users`)
      .get((req: Request, res: Response) => {
        res.status(200).json({ msg: 'list users' })
      })
      .post((req: Request, res: Response) => {
        res.status(200).json({ msg: 'post users' })
      })

    this.router
      .route(`/users/:userId`)
      .all((req: Request, res: Response) => {
        // authentication, if any
      })
      .get((req: Request, res: Response) => {
        res.status(200).json({ msg: `user ${req.params.userId}` })
      })
      .post((req: Request, res: Response) => {})
      .patch((req: Request, res: Response) => {})
      .delete((req: Request, res: Response) => {})

    this.router
      .route(`/users/:userId/settings`)
      .get((req: Request, res: Response) => {
        res.status(200).json({ msg: 'list user settings' })
      })
      .post((req: Request, res: Response) => {
        res.status(200).json({ msg: 'post user settings' })
      })
  }
}
