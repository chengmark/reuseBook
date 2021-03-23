import { Obj } from '@myTypes/Obj'
import axios from 'axios'

const URL = process.env.NODE_ENV == 'production' ? `${process.env.PUBLIC_URL}/api` : `http://localhost:3002/api`

const UserHelper = {
  login: async (input: Obj): Promise<Obj> => {
    const response = await axios({
      method: 'post',
      url: `${URL}/login`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: input,
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
}

export default UserHelper
