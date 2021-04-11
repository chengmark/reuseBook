import mongoose from 'mongoose'

export type CreateReview = {
  bookId: string
  content: string
  userId: string
}

export type GetReview = {
  reviewId: string
}

export type DeleteReview = {
  reviewId: string
}

export type EditReview = {
  reviewId: string
  content: string
}

export type ListReviews = {
  bookId: string
}

export type DeleteReviews = {
  bookId: string
}

export type GetUser = {
  reviewId: string
}
