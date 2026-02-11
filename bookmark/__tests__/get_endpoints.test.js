const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');


beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});


afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET Endpoints for all collections', () => {
  
  
  it('should return all books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  
  it('should return all authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  
  it('should return all genres', async () => {
    const res = await request(app).get('/genres');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  
  it('should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});