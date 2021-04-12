import { app } from '../../index'
import supertest from 'supertest'

describe('Testing the movies API', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users')
    expect(typeof response.body[0].status).toBe('string')
  })
})

describe('Testing the movies API', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users/tqisndqi')
    expect(typeof response.body.message).toBe('string')
  })
})
