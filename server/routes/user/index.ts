import { Request, Response, Router } from 'express'
import { Routes } from '..'
import UserController from './UserController'

// routes for user related operations
export class UserRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'UserRoutes')
  }

  configureRoutes(): void {
    this.router
      .route(`/login`)
      // .all((req: Request, res: Response) => {
      //   // restrict to only from our site
      // })
      .post((req: Request, res: Response) => {
        UserController.login(req, res)
      })

    this.router
      .route(`/users`)
      .get((req: Request, res: Response) => {
        UserController.listUsers(req, res)
      })
      .post((req: Request, res: Response) => {
        UserController.createUser(req, res)
      })

    this.router
      .route(`/users/:userId`)
      // .all((req: Request, res: Response) => {
      //   // authentication, if any
      // })
      .get((req: Request, res: Response) => {
        UserController.getUser(req, res)
      })
      .post((req: Request, res: Response) => {})
      .patch((req: Request, res: Response) => {})
      .delete((req: Request, res: Response) => {
        UserController.deleteUser(req, res)
      })

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
