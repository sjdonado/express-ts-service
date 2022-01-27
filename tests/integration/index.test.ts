import request from 'supertest';
import App from '@app';

describe('Index routes', () => {
  it('Should return not found', async () => {
    const response = await request(App).get('/');

    expect(response.statusCode).toBe(404);
    expect(response.body.data).toBeNull();
    expect(response.body.error).toBe('Not found');
  });
});
