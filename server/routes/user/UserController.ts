import { Request, Response } from 'express'
import User from '../../models/User'
import { CreateUser, DeleteUser, GetUser, ListUsers, Login } from './params'
import bcrypt from 'bcrypt'
import { isEmail, ONE_DAY } from '../../utils'
import mongoose from 'mongoose'

const SECURE_COOKIE = process.env.NODE_ENV == 'production'

const UserController = {
  auth: (req: Request, res: Response) => {
    // if (req.signedCookies['SID']) {
    //   console.log(req.signedCookies['SID'])
    //   console.log(req.session.userId)
    //   User.findOne({ _id: req.session.userId }, (err: any, data: any) => {
    //     if (err) return res.status(500).send({ message: 'Cannot get user' })
    //     if (!data) return res.status(403).send({ message: 'invalid user id' })
    //     res.status(200).send(data)
    //   })
    // } else {
    //   res
    //     .status(403)
    //     .cookie('SID', req.sessionID, {
    //       maxAge: ONE_DAY,
    //       signed: true,
    //       secure: !SECURE_COOKIE,
    //       sameSite: 'lax',
    //       httpOnly: true,
    //     })
    //     .send({ message: 'no session' })
    // }
  },
  // list all users
  listUsers: async (req: Request, res: Response): Promise<void> => {
    const { status } = <ListUsers>(<unknown>req.body)
    const query = status ? { status: status } : {}
    User.find(query, (err, data) => {
      if (err) return res.status(500).send(err)
      res.status(200).send(data)
    })
  },
  // create a user
  createUser: async (req: Request, res: Response): Promise<void> => {
    const newUser = <CreateUser>(<unknown>req.body)
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash
        User.create(newUser, (err, data) => {
          if (err) return res.status(500).send(err)
          res.status(200).send(data)
        })
      })
    })
  },
  // login
  login: async (req: Request, res: Response): Promise<void> => {
    const { emailOrUsername, password } = <Login>(<unknown>req.body)
    const query = isEmail(emailOrUsername) ? { email: emailOrUsername } : { username: emailOrUsername }
    User.findOne(query, (err: any, data: any) => {
      if (err) return res.status(500).send(err)
      if (!data) return res.status(500).send({ message: 'user not found' })
      bcrypt.compare(password, data.password, (err, result) => {
        if (err) return res.status(500).send({ message: 'password comparison error' })
        if (!result) return res.status(403).send({ message: 'invalid password' })
        // if cookie is modified or not set yet,
        // then set the session and cookie with SID
        // console.log(req.signedCookies['SID'])
        // console.log(req.session.userId)
        // if (!req.signedCookies['SID'] || req.signedCookies['SID'] != req.session.userId) {
        //   req.session.userId = data._id
        //   console.log('save cookie', req.session.userId)
        //   res
        //     .status(200)
        //     .cookie('SID', req.sessionID, {
        //       maxAge: ONE_DAY,
        //       signed: true,
        //       secure: SECURE_COOKIE,
        //       sameSite: 'lax',
        //       httpOnly: true,
        //     })
        //     .send(data)
        // } else res.status(200).send(data)
      })
    })
  },
  logout: async (req: Request, res: Response): Promise<void> => {
    req.session.destroy(() => {
      res.status(200).clearCookie('SID').send({ message: 'logout successfully' })
    })
  },
  // get a user
  getUser: async (req: Request, res: Response): Promise<void> => {
    const { userId } = <GetUser>(<unknown>req.params)
    try {
      const _id = mongoose.Types.ObjectId(userId)
      User.findOne({ _id: _id }, (err: any, data: any) => {
        if (err) return res.status(500).send(err)
        if (!data) return res.status(500).send({ message: 'user not found' })
        res.status(200).send(data)
      })
    } catch (e) {
      res.status(500).send({ message: 'invalid userId' })
    }
  },
  // delete a user
  deleteUser: async (req: Request, res: Response): Promise<void> => {
    const { userId } = <DeleteUser>(<unknown>req.params)
    try {
      const _id = mongoose.Types.ObjectId(userId)
      User.deleteOne({ _id: _id }, {}, (err: any) => {
        if (err) return res.status(500).send(err)
        res.status(200).send({ message: 'user deleted' })
      })
    } catch (e) {
      res.status(500).send({ message: 'invalid userId' })
    }
  },
}

export default UserController
