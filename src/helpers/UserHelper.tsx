import { Obj } from '@myTypes/Obj'
import axios from 'axios'

const URL = process.env.NODE_ENV == 'production' ? `${process.env.PUBLIC_URL}/api` : `http://localhost:3002/api`

const UserHelper = {
  auth: async (): Promise<Obj> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/auth`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    return await response.data
  },
  login: async (input: Obj): Promise<Obj> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/login`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: input,
    })
    return await response.data
  },
  logout: async (): Promise<Obj> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/logout`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    return await response.data
  },
  signup: async (input: Obj): Promise<Obj> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/users`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: input,
    })
    // .then((res) => {
    //   console.log(res)
    //   console.log(res.data)
    // })
    // .catch((err) => {
    //   console.log(err)
    //   console.log(err.response)
    // })
    return await response.data
  },
  setInterests: async (input: Obj): Promise<Obj> => {
    const { userId, interestIds } = input
    const response = await axios({
      method: 'post',
      url: `${URL}/users/${userId}/interests`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: { interestIds: interestIds },
    })
    return await response.data
  },
}

export default UserHelper
