import { app } from '../../index'
import supertest from 'supertest'

// chat/index.ts

describe('Testing /chats/:roomID/', () => {
  it('test list chat', async () => {
    const response = await supertest(app).get('/api/chats/6075f83aca8d5a4a903d2a12')
    expect(typeof response.body.users[0]).toBe('string')
    expect(typeof response.body._id).toBe('string')
    expect(typeof response.body.name).toBe('string')
    expect(typeof response.body.createdAt).toBe('string')
    expect(typeof response.body.updatedAt).toBe('string')
  })  
})
