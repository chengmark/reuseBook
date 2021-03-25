import { Request, Response, Router } from 'express'
import { Routes } from '..'
import UserController from './UserController'

// routes for user related operations
export class UserRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'UserRoutes')
  }

  configureRoutes(): void {
    this.router.route('/auth').post((req: Request, res: Response) => {
      UserController.auth(req, res)
    })

    this.router.route('/logout').post((req: Request, res: Response) => {
      UserController.logout(req, res)
    })

    this.router.route(`/login`).post((req: Request, res: Response) => {
      UserController.login(req, res)
    })

    this.router.route('/token').post((req: Request, res: Response) => {
      UserController.createResetPwToken(req, res)
    })

    this.router.route('/reset').post((req: Request, res: Response) => {
      UserController.resetPassword(req, res)
    })

    this.router
      .route(`/users`)
      .get((req: Request, res: Response) => {
        UserController.listUsers(req, res)
      })
      .post((req: Request, res: Response) => {
        console.log(req.body)
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
      .post((req: Request, res: Response) => {
        res.status(200).send({ message: 'post user' })
      })
      .patch((req: Request, res: Response) => {
        res.status(200).send({ message: 'upadte user' })
      })
      .delete((req: Request, res: Response) => {
        UserController.deleteUser(req, res)
      })

    this.router
      .route(`/users/:userId/interests`)
      .get((req: Request, res: Response) => {
        res.status(200).json({ msg: 'get user interests' })
      })
      .post((req: Request, res: Response) => {
        UserController.setInterests(req, res)
      })
  }
}
