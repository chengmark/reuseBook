import { Obj } from '@myTypes/Obj'
import axios from 'axios'

const URL = process.env.NODE_ENV == 'production' ? `${process.env.PUBLIC_URL}/api` : `http://localhost:3002/api`

const BookService = {
  auth: async (): Promise<Obj> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/auth`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    return await response.data
  },
  getSignedRequest: async (input: Obj): Promise<Obj> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/sign-s3`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: input,
    })
    return await response.data
  },
  uploadImage: async (file: File, signedRequest: Obj, url: string): Promise<Obj> => {
    const response = await axios({
      method: 'put',
      url: url,
      headers: { 'Content-Type': file.type, acl: 'public-read' },
      data: file,
    })
    return await response.data
  },
  createBook: async (input: Obj): Promise<Obj> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/books`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: input,
    })
    return await response.data
  },
  getBook: async (id: string): Promise<Obj> => {
    const response = await axios({
      method: 'get',
      url: `${URL}/books/${id}`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    return await response.data
  },
  addReview: async (id: string, input: Obj): Promise<Obj> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/books/${id}/reviews`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: input,
    })
    return await response.data
  },
  search: async (
    keyword: string,
    persist: boolean,
    sort: 'similarity' | 'createdAt' | 'reviewNum',
    filters?: Obj,
    pageNum = 1,
  ): Promise<Obj> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/search`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: { keyword: keyword, pageNum: pageNum, pageSize: 4, persist: persist, filters: filters, sort: sort },
    })
    return await response.data
  },
  deleteBook: async (id: string): Promise<Obj> => {
    const response = await axios({
      method: 'delete',
      url: `${URL}/books/${id}`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    return await response.data
  },
  listSuggestions: async (interestIds: Array<string>, exclude?: string): Promise<any> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/suggestions`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: { interestIds: interestIds, max: 6, exclude: exclude },
    })
    return await response.data
  },
  addOffer: async (bookId: string, contact: string, buyerId: string, sellerId: string) => {
    const response = await axios({
      method: 'post',
      url: `${URL}/offer`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: { book: bookId, contact: contact, buyerId: buyerId, sellerId: sellerId },
    })
    return await response.data
  },
  getBookBySeller: async (sellerId: string) => {
    const response = await axios({
      method: 'get',
      url: `${URL}/books/seller/${sellerId}`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    return await response.data
  },
  getOfferBySeller: async (sellerId: string) => {
    const response = await axios({
      method: 'get',
      url: `${URL}/offer/${sellerId}`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    return await response.data
  },
  deleteOffer: async (offerId: string) => {
    const response = await axios({
      method: 'delete',
      url: `${URL}/offer`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: { id: offerId },
    })
    return await response.data
  },
}

export default BookService
