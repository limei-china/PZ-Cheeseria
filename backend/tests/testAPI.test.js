const request = require('supertest');
const app = require('../index.js');
// Test if get api works fine
describe('GET /cheeses', () => {
  it('Return a list of cheeses', async () => {
      const res = await request(app).get('/cheeses');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(5);
  });
});