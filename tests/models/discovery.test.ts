import {
  getFlightKey,
  mergeAndClean,
  fetchAndRetry,
  cacheStore,
} from '@models/discovery';
import ApiError from '@utils/ApiError';

import {
  RESPONSE_SOURCE1,
  RESPONSE_SOURCE2,
  RESPONSES_MERGED,
} from '../mocks';

describe('Discovery model', () => {
  describe('#getFlightKey()', () => {
    it('Should get a valid key', () => {
      const output = getFlightKey(RESPONSE_SOURCE1.flights[0].slices);

      expect(output).toBe('8545,2019-08-08T20:25:00.000Z|8544,2019-08-10T18:00:00.000Z|');
    });
  });

  describe('#mergeAndClean()', () => {
    it('Should return the responses merged', () => {
      const output = mergeAndClean(RESPONSE_SOURCE1.flights, RESPONSE_SOURCE2.flights);

      expect(output).toMatchObject(RESPONSES_MERGED);
      expect(output.flights).toHaveLength(10);
    });
  });

  describe('#fetchAndRetry()', () => {
    it('Should merge and clean flights', async () => {
      fetchMock.mockResponses(
        [JSON.stringify(RESPONSE_SOURCE1), { status: 200 }],
        [JSON.stringify(RESPONSE_SOURCE2), { status: 200 }],
      );

      const output = await fetchAndRetry();

      expect(fetchMock).toBeCalledTimes(2);
      expect(output[0]).toHaveLength(6);
      expect(output[1]).toHaveLength(10);
    });

    it('Should retry 2 times', async () => {
      cacheStore.clear();
      fetchMock.mockResponses(
        ['Service Unavailable', { status: 503 }],
        ['Service Unavailable', { status: 503 }],
        [JSON.stringify(RESPONSE_SOURCE1), { status: 200 }],
        [JSON.stringify(RESPONSE_SOURCE2), { status: 200 }],
      );

      const output = await fetchAndRetry();

      expect(fetchMock).toBeCalledTimes(4);
      expect(output[0]).toHaveLength(6);
      expect(output[1]).toHaveLength(10);
    });

    it('Should retry 4 times', async () => {
      cacheStore.clear();
      fetchMock.mockAbort();

      expect(fetchAndRetry).rejects.toThrow(new ApiError(503, 'External APIs unavailable'));
    });
  });
});
