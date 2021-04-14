// clear listing of params for APIs
import mongoose from 'mongoose'

export type ListOfferBySeller = {
  sellerId: string
}

export type DeleteOffer = {
  id: string
}

export type CreateOffer = {
  sellerId: string
  buyerId: string
  book: string
}
