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
  ): Promise<Obj> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/search`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: { keyword: keyword, pageNum: 1, pageSize: 20, persist: persist, filters: filters, sort: sort },
    })
    return await response.data
  },
}

export default BookService
