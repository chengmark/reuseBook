import { Request, Response } from 'express'
import { CreateReview, DeleteReview, EditReview, ListReviews, DeleteReviews, GetUser, GetReview } from './params'
import mongoose from 'mongoose'
import Review from '../../models/Review'
import Book from '../../models/Book'
import User from '../../models/User'

const ReviewController = {
  createReview: async (req: Request, res: Response): Promise<void> => {
    const { bookId } = <CreateReview>(<unknown>req.params)
    const { content, userId } = <CreateReview>(<unknown>req.body)
    const _userId = mongoose.Types.ObjectId(userId)

    const newReview = { content: content }

    Review.create(newReview, (err, data) => {
      if (err) {
        return res.status(500).send({ message: 'Error creating review' })
      }
      Review.updateOne({ _id: data._id }, { $set: { user: _userId } }, {}, (errUser: any, result: any) => {
        if (errUser) {
          return res.status(500).send({ message: 'error setting up user id' })
        }
      })
      Book.updateOne(
        { _id: mongoose.Types.ObjectId(bookId) },
        { $push: { reviews: data._id } },
        {},
        (errBook, result) => {
          if (errBook) {
            return res.status(500).send({ message: 'error adding review to book' })
          }
          res.status(200).send({ result })
        },
      )
    })
  },

  getReview: async (req: Request, res: Response): Promise<void> => {
    console.log(req.params)
    const { reviewId } = <GetReview>(<unknown>req.params)

    try {
      const _id = mongoose.Types.ObjectId(reviewId)
      Review.findOne({ _id: _id })
        .populate('User')
        .exec((err, data) => {
          if (err) {
            return res.status(500).send({ message: 'error finding review' })
          }
          res.status(200).send(data)
        })
    } catch (e) {
      console.log(e)
      res.status(500).send({ message: 'invalid reviewId' })
    }
  },

  deleteReview: async (req: Request, res: Response): Promise<void> => {
    const { reviewId } = <DeleteReview>(<unknown>req.params)
    try {
      const _id = mongoose.Types.ObjectId(reviewId)
      Review.deleteOne({ _id: _id }, {}, (err: any) => {
        if (err) return res.status(500).send(err)
        res.status(200).send({ message: 'review deleted' })
      })
    } catch (e) {
      res.status(500).send({ message: 'invalid review Id' })
    }
  },

  editReview: async (req: Request, res: Response): Promise<void> => {
    const { reviewId } = <EditReview>(<unknown>req.params)
    const { content } = <EditReview>(<unknown>req.body)

    const _id = mongoose.Types.ObjectId(reviewId)
    Review.updateOne({ _id: _id }, { content: content }, {}, (err, result) => {
      if (err) {
        return res.status(500).send({ mesage: 'error updating review' })
      }
      res.status(200).send(result)
    })
  },

  listReviews: async (req: Request, res: Response): Promise<void> => {
    const { bookId } = <ListReviews>(<unknown>req.params)
    const _id = mongoose.Types.ObjectId(bookId)

    Book.findOne({ _id: _id }, (err: any, data: any) => {
      if (err) {
        return res.status(500).send({ message: 'error finding the book' })
      }
      const reviewIds = data.reviews
      const newIds: mongoose.Types.ObjectId[] = []
      reviewIds.forEach((reviewId: any) => {
        newIds.push(mongoose.Types.ObjectId(reviewId))
      })
      Review.find({
        _id: {
          $in: newIds,
        },
      })
        .sort({ createdAt: -1 })
        .exec((errReview, dataReview) => {
          if (errReview) {
            res.status(400).send({ message: 'error listing all the reviews of book' })
          }
          res.status(200).send(dataReview)
        })
    })
  },

  deleteReviews: async (req: Request, res: Response): Promise<void> => {
    console.log(req.params)
    const { bookId } = <DeleteReviews>(<unknown>req.params)
    const _id = mongoose.Types.ObjectId(bookId)

    Book.findOne({ _id: _id }, (err: any, data: any) => {
      if (err) {
        return res.status(500).send({ message: 'error finding the book' })
      }
      try {
        const reviewIds = data.reviews
        reviewIds.forEach((reviewId: any) => {
          const _reviewId = mongoose.Types.ObjectId(reviewId)
          Review.deleteOne({ _id: _reviewId }, {}, (error) => {
            if (error) {
              return res.status(500).send({ message: 'error' })
            }
          })
        })
        res.status(200).send({ message: 'All reviews deleted' })
      } catch (e) {
        console.log(e)
        res.status(500).send({ message: 'error deleting reviews of the books' })
      }
    })
  },

  getUser: async (req: Request, res: Response): Promise<void> => {
    const { reviewId } = <GetUser>(<unknown>req.params)

    Review.findOne({ _id: mongoose.Types.ObjectId(reviewId) }, (err: any, data: any) => {
      const userId = data.user
      const _id = mongoose.Types.ObjectId(userId)
      User.findOne({ _id: _id }, (errUser: any, dataUser: any) => {
        if (errUser) {
          return res.status(500).send({ message: 'error finding user of the review' })
        }
        res.status(200).send(dataUser)
      })
    })
  },
}

export default ReviewController
