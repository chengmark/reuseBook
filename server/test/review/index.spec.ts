import { app } from '../../index'
import supertest from 'supertest'

// review/index.ts

describe('Testing /books/:bookId/reviews/', () => {
  it('test list review', async () => {
    const response = await supertest(app).get('/api/books/6075ee7f97c0571c5cc2ec48/reviews')
    expect(typeof response.body[0]._id).toBe('string')
    expect(typeof response.body[0].createdAt).toBe('string')
    expect(typeof response.body[0].__v).toBe('number')
    expect(typeof response.body[0].user).toBe('string')
  })  
})
