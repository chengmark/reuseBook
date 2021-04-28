import { app } from '../../index'
import supertest from 'supertest'

// book/index.ts

describe('Testing /books/:bookId', () => {
  it('test list book', async () => {
    const response = await supertest(app).get('/api/books/6075ee7f97c0571c5cc2ec48')
    expect(typeof response.body._id).toBe('string')
    expect(typeof response.body.createdAt).toBe('string')
  })  
})
