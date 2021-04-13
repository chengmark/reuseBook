import { app } from '../../index'
import supertest from 'supertest'

// category/index.ts

describe('Testing /category/:categoryId', () => {
  it('test list category', async () => {
    const response = await supertest(app).get('/api/category/60744118fc6495383cdf6b6d')
    expect(typeof response.body[0]._id).toBe('string')
    expect(typeof response.body[0].name).toBe('string')
    expect(typeof response.body[0].__v).toBe('number')
  })  
})
