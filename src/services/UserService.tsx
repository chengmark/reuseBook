import { Obj } from '@myTypes/Obj'
import axios from 'axios'

const URL = process.env.NODE_ENV == 'production' ? `${process.env.PUBLIC_URL}/api` : `http://localhost:3002/api`

const UserService = {
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
  createResetToken: async (input: Obj): Promise<Obj> => {
    const { email } = input
    const response = await axios({
      method: 'post',
      url: `${URL}/token`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: { email: email },
    })
    return await response.data
  },
  resetPassword: async (input: Obj): Promise<Obj> => {
    const { tokenId, password } = input
    const response = await axios({
      method: 'post',
      url: `${URL}/reset`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: input,
    })
    return await response.data
  },
}

export default UserService
