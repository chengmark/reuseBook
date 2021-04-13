import axios from 'axios'

const URL = process.env.NODE_ENV == 'production' ? `${process.env.PUBLIC_URL}/api` : `http://localhost:3002/api`

const CategoryService = {
  listCategories: async (): Promise<any> => {
    const response = await axios({
      method: 'get',
      url: `${URL}/category`,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    return await response.data
  },
}

export default CategoryService
