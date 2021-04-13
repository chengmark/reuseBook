import { app } from '../../index'
import supertest from 'supertest'

// user/book.ts

describe('Testing /books/:bookId/_id', () => {
  it('test list book', async () => {
    const response = await supertest(app).get('/api/books/6075ee7f97c0571c5cc2ec48')
    expect(typeof response.body._id).toBe('string')
  })  
})

describe('Testing /books/:bookId/createdAt', () => {
  it('test list book', async () => {
    const response = await supertest(app).get('/api/books/6075ee7f97c0571c5cc2ec48')
    expect(typeof response.body.createdAt).toBe('string')
  })  
})

describe('Testing /books/:bookId/__v', () => {
  it('test list book', async () => {
    const response = await supertest(app).get('/api/books/6075ee7f97c0571c5cc2ec48')
    expect(typeof response.body.__v).toBe('number')
  })  
})

// user/category.ts

describe('Testing /category/:categoryId/_id', () => {
  it('test list category', async () => {
    const response = await supertest(app).get('/api/category/60744118fc6495383cdf6b6d')
    expect(typeof response.body[0]._id).toBe('string')
  })  
})

describe('Testing /category/:categoryId/name', () => {
  it('test list category', async () => {
    const response = await supertest(app).get('/api/category/60744118fc6495383cdf6b6d')
    expect(typeof response.body[0].name).toBe('string')
  })  
})

describe('Testing /category/:categoryId/__v', () => {
  it('test list category', async () => {
    const response = await supertest(app).get('/api/category/60744118fc6495383cdf6b6d')
    expect(typeof response.body[0].__v).toBe('number')
  })  
})

// user/chat.ts

describe('Testing /chats/:roomID/users', () => {
  it('test list chat', async () => {
    const response = await supertest(app).get('/api/chats/6075f83aca8d5a4a903d2a12')
    expect(typeof response.body.users[0]).toBe('string')
  })  
})

describe('Testing /chats/:roomID/_id', () => {
  it('test list chat', async () => {
    const response = await supertest(app).get('/api/chats/6075f83aca8d5a4a903d2a12')
    expect(typeof response.body._id).toBe('string')
  })  
})

describe('Testing /chats/:roomID/name', () => {
  it('test list chat', async () => {
    const response = await supertest(app).get('/api/chats/6075f83aca8d5a4a903d2a12')
    expect(typeof response.body.name).toBe('string')
  })  
})

describe('Testing /chats/:roomID/createdAt', () => {
  it('test list chat', async () => {
    const response = await supertest(app).get('/api/chats/6075f83aca8d5a4a903d2a12')
    expect(typeof response.body.createdAt).toBe('string')
  })  
})

describe('Testing /chats/:roomID/updatedAt', () => {
  it('test list chat', async () => {
    const response = await supertest(app).get('/api/chats/6075f83aca8d5a4a903d2a12')
    expect(typeof response.body.updatedAt).toBe('string')
  })  
})

describe('Testing /chats/:roomID/__v', () => {
  it('test list chat', async () => {
    const response = await supertest(app).get('/api/chats/6075f83aca8d5a4a903d2a12')
    expect(typeof response.body.__v).toBe('number')
  })  
})

// user/review.ts

describe('Testing /books/:bookId/reviews/_id', () => {
  it('test list review', async () => {
    const response = await supertest(app).get('/api/books/6075ee7f97c0571c5cc2ec48/reviews')
    expect(typeof response.body[0]._id).toBe('string')
  })  
})

describe('Testing /books/:bookId/reviews/createdAt', () => {
  it('test list review', async () => {
    const response = await supertest(app).get('/api/books/6075ee7f97c0571c5cc2ec48/reviews')
    expect(typeof response.body[0].createdAt).toBe('string')
  })  
})

describe('Testing /books/:bookId/reviews/__v', () => {
  it('test list review', async () => {
    const response = await supertest(app).get('/api/books/6075ee7f97c0571c5cc2ec48/reviews')
    expect(typeof response.body[0].__v).toBe('number')
  })  
})

describe('Testing /books/:bookId/reviews/user', () => {
  it('test list review', async () => {
    const response = await supertest(app).get('/api/books/6075ee7f97c0571c5cc2ec48/reviews')
    expect(typeof response.body[0].user).toBe('string')
  })  
})

// transaction/index.ts
/*
describe('Testing /transactions', () => {
  it('test list transactions', async () => {
    const response = await supertest(app).get('/api/transactions')
    expect(typeof response.body._id).toBe('string')
  })
})

describe('Testing /transactions/buying/:userId', () => {
  it('test list transactions', async () => {
    const response = await supertest(app).get('/api/transactions/buying/6075b183fc9753259c629af3')
    expect(typeof response.body[0].status).toBe('string')
  })
})

describe('Testing /transactions/selling/:userId', () => {
  it('test list transactions', async () => {
    const response = await supertest(app).get('/api/transactions/selling/6075b183fc9753259c629af3')
    expect(typeof response.body[0].status).toBe('string')
  })
})
*/

// user/index.ts

describe('Testing /users', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users')
    expect(typeof response.body[0].status).toBe('string')
  })
})

describe('Testing /users/:userId/interests', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users/6075ae8081506128842c116f/interests')
    expect(typeof response.status).toBe('number')
  })
})

describe('Testing /users/:userId', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users/6075ae8081506128842c116f')
    expect(typeof response.body._id).toBe('string')
  })
})

describe('Testing /users/:firstname', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users/6075ae8081506128842c116f')
    expect(typeof response.body.firstname).toBe('string')
  })
})

describe('Testing /users/:lastname', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users/6075ae8081506128842c116f')
    expect(typeof response.body.lastname).toBe('string')
  })
})

describe('Testing /users/:password', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users/6075ae8081506128842c116f')
    expect(typeof response.body.password).toBe('string')
  })
})

describe('Testing /users/:email', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users/6075ae8081506128842c116f')
    expect(typeof response.body.email).toBe('string')
  })
})

describe('Testing /users/:createdAt', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users/6075ae8081506128842c116f')
    expect(typeof response.body.createdAt).toBe('string')
  })
})

describe('Testing /users/:updatedAt', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users/6075ae8081506128842c116f')
    expect(typeof response.body.updatedAt).toBe('string')
  })
})

describe('Testing /users/:__v', () => {
  it('test list users', async () => {
    const response = await supertest(app).get('/api/users/6075ae8081506128842c116f')
    expect(typeof response.body.__v).toBe('number')
  })
})