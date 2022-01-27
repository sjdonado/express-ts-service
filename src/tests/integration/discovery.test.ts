import request from 'supertest';

import App from '@app';

import { fetchMockAll, RESPONSES_MERGED } from '../mocks';

describe('Discovery routes', () => {
  const BASE_URL = '/v1/discovery';

  describe('GET /ping', () => {
    it('Should return 200', async () => {
      const response = await request(App).get(`${BASE_URL}/ping`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeNull();
      expect(response.body.error).toBeUndefined();
    });
  });

  describe('GET /', () => {
    beforeAll(() => {
      fetchMockAll();
    });

    it('Should return 200', async () => {
      const response = await request(App).get(`${BASE_URL}/`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toMatchObject(RESPONSES_MERGED);
      expect(response.body.error).toBeUndefined();
    });

    it('Should return 503', async () => {
      fetchMock.mockAbort();

      const response = await request(App).get(`${BASE_URL}/`);

      expect(response.statusCode).toBe(503);
      expect(response.body.data).toBeNull();
      expect(response.body.error).toBe('External APIs unavailable');
    });
  });
});
