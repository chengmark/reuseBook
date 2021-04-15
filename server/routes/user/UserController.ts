import { Request, Response } from 'express'
import User from '../../models/User'
import {
  CreateUser,
  DeleteUser,
  GetUser,
  ListUsers,
  Login,
  AddInterests,
  ResetPassword,
  SetPassword,
  UpdateUserInfo,
} from './params'
import bcrypt from 'bcrypt'
import { isEmail, ONE_DAY, SHA256 } from '../../utils'
import mongoose from 'mongoose'
import Token from '../../models/Token'
import sendMail, { resetPwTemplate } from '../../Mailer'
import nodemailer from 'nodemailer'

const SECURE_COOKIE = process.env.NODE_ENV == 'production'

const UserController = {
  // session checking
  auth: (req: Request, res: Response) => {
    if (req.signedCookies['SID']) {
      User.findOne({ _id: req.session.userId })
        .populate('interests')
        .then((data) => {
          if (!data) return res.status(403).send({ message: 'Invalid user id' })
          res.status(200).send(data)
        })
    } else {
      res.status(204).send({ message: 'no session' })
    }
  },
  // list all users
  listUsers: async (req: Request, res: Response): Promise<void> => {
    const { status } = <ListUsers>(<unknown>req.body)
    const query = status ? { status: status } : {}
    User.find(query)
      .sort({ createdAt: -1 })
      .exec((err, data) => {
        if (err) return res.status(500).send({ message: 'Error in getting users from DB' })
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
          if (err) {
            if (err.message.match('duplicate key')) {
              if (err.message.match('email')) return res.status(500).send({ message: 'Duplicate email' })
              if (err.message.match('username')) return res.status(500).send({ message: 'Duplicate username' })
            } else return res.status(500).send({ message: 'Error in creating new user' })
          }
          req.session.userId = data._id
          res
            .status(200)
            .cookie('SID', req.sessionID, {
              maxAge: ONE_DAY,
              signed: true,
              secure: SECURE_COOKIE,
              sameSite: 'lax',
              httpOnly: true,
            })
            .send(data)
        })
      })
    })
  },
  // login
  login: async (req: Request, res: Response): Promise<void> => {
    const { emailOrUsername, password } = <Login>(<unknown>req.body)
    const query = isEmail(emailOrUsername) ? { email: emailOrUsername } : { username: emailOrUsername }
    User.findOne(query)
      .populate('interests')
      .then((data: any) => {
        if (!data) return res.status(404).send({ message: 'User not found' })
        bcrypt.compare(password, data.password, (err, result) => {
          if (err) return res.status(500).send({ message: 'Password comparison error' })
          if (!result) return res.status(403).send({ message: 'Invalid password' })
          // if cookie is modified or not set yet,
          // then set the session and cookie with SID
          if (!req.signedCookies['SID'] || req.signedCookies['SID'] != req.session.userId) {
            req.session.userId = data._id
            res
              .status(200)
              .cookie('SID', req.sessionID, {
                maxAge: ONE_DAY,
                signed: true,
                secure: SECURE_COOKIE,
                sameSite: 'lax',
                httpOnly: true,
              })
              .send(data)
          } else res.status(200).send(data)
        })
      })
      .catch((err) => {
        if (err) return res.status(500).send(err)
      })
  },
  logout: async (req: Request, res: Response): Promise<void> => {
    req.session.destroy(() => {
      res.status(200).clearCookie('SID').send({ message: 'Logout successfully' })
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

  updateUserInfo: async (req: Request, res: Response): Promise<void> => {
    const { userId } = <UpdateUserInfo>(<unknown>req.params)
    const _userId = mongoose.Types.ObjectId(userId)
    const { password, firstName, lastName } = <UpdateUserInfo>(<unknown>req.body)
    let newInfo: any = {}
    if (password && firstName && lastName) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          newInfo = { password: hash, firstname: firstName, lastName: lastName }
          User.findByIdAndUpdate({ _id: _userId }, newInfo, { new: true }, (err, result) => {
            if (err) return res.status(500).send({ message: 'error updating user' })
            res.status(200).send(result)
          })
        })
      })
    }
    if (!password) {
      newInfo = { firstName: firstName ?? '', lastName: lastName ?? '' }
      User.findByIdAndUpdate({ _id: _userId }, newInfo, { new: true }, (err, result) => {
        if (err) return res.status(500).send({ message: 'error updating user' })
        res.status(200).send(result)
      })
    }
  },

  // add interests
  setInterests: async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params
    const { interestIds } = <AddInterests>(<unknown>req.body)
    const newIds: mongoose.Types.ObjectId[] = []
    interestIds.forEach((interestId) => {
      newIds.push(mongoose.Types.ObjectId(interestId))
    })
    User.updateOne({ _id: userId }, { $set: { interests: newIds } }, {}, (err, result) => {
      if (err) return res.status(500).send({ message: 'Error in updating interests' })
      res.status(200).send({ message: 'Interests updated' })
    })
  },
  createResetPwToken: async (req: Request, res: Response): Promise<void> => {
    const { email } = <ResetPassword>(<unknown>req.body)
    User.findOne({ email: email }, (err, data) => {
      if (err) return res.status(500).send({ message: 'Cannot find user' })
      if (!data) return res.status(403).send({ message: 'Email not found' })
      const tokenId = SHA256(data._id + Date.now())
      // create or update the token
      Token.updateOne(
        { refId: data._id },
        { type: 'resetPw', tokenId: tokenId, refId: data._id, createdAt: Date.now() },
        { upsert: true },
        (err, result) => {
          if (err) return res.status(500).send({ message: 'Cannot create token' })
          const resetURL = 'https://' + req.headers.host + `/reset?token=${tokenId}`
          sendMail(email, resetPwTemplate(data.username, resetURL)).then((info) => {
            res.status(200).send(info)
          })
        },
      )
    })
  },
  resetPassword: async (req: Request, res: Response): Promise<void> => {
    const { tokenId, password } = <SetPassword>(<unknown>req.body)
    Token.findOne({ tokenId: tokenId }, (err, token) => {
      if (err) return res.status(500).send({ message: 'Cannot validate token' })
      if (!token)
        return res.status(403).send({ message: 'Request expried or does not exist, please send the request again' })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          User.updateOne({ _id: token.refId }, { password: hash }, { upsert: false }, (err, result) => {
            if (err) return res.status(500).send({ message: 'Cannot reset password' })
            res.status(200).send({ message: 'Password reset successfully' })
          })
        })
      })
    })
  },
}

export default UserController
