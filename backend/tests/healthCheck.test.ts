import request from 'supertest';
import { app, server } from '../src';

describe('GET /health', () => {
  afterAll((done) => {
    server.close(done);
  });
  it('should return a status of ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('message', 'Service is healthy');
  });
});
