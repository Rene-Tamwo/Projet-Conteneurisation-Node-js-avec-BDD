// app-docker/tests/non-regression/app.snapshot.test.js
const request = require('supertest');
const app = require('../../src/app'); // adapte selon ton chemin vers l'app Express

describe('Non-regression snapshot test', () => {
  it('should match the /health route response snapshot', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
  });
});
