import { app } from '../../index'
import supertest from 'supertest'

// user/index.ts

describe('Testing /users/:userId', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users/6075ae8081506128842c116f')
    expect(typeof response.body.status).toBe('string')
    expect(typeof response.body.interests[0]).toBe('string')
    expect(typeof response.body._id).toBe('string')
    expect(typeof response.body.firstname).toBe('string')
    expect(typeof response.body.lastname).toBe('string')
    expect(typeof response.body.password).toBe('string')
    expect(typeof response.body.email).toBe('string')
    expect(typeof response.body.createdAt).toBe('string')
    expect(typeof response.body.updatedAt).toBe('string')
  })
})