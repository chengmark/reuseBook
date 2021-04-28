// clear listing of params for APIs

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
