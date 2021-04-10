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
}

export default BookService
