import { Discovery, Flight, Slice } from '@interfaces/discovery';
import ApiError from '@utils/ApiError';
import ApiConsumer from '@services/ApiConsumer';

const cacheStore: Map<string, Flight[]> = new Map();
const apiConsumer = new ApiConsumer();

export function getFlightKey(slices: Slice[]): string {
  let flightKey = '';
  slices.forEach((slice) => {
    flightKey += `${slice.flight_number},${slice.departure_date_time_utc}|`;
  });

  return flightKey;
}

export function mergeAndClean(source1Flights: Flight[], source2Flights: Flight[]): Discovery {
  const mem = new Set();
  const flights = [];

  [...source1Flights, ...source2Flights].forEach((flight) => {
    const flightKey = getFlightKey(flight.slices);

    if (!mem.has(flightKey)) {
      flights.push(flight);
      mem.add(flightKey);
    }
  });

  return { flights };
}

export const fetchAndRetry = async (attemps = 0): Promise<[Flight[], Flight[]]> => {
  let retry = false;
  const source1Key = `1|${(Date.now() / 1000).toFixed()}`;
  const source2Key = `2|${(Date.now() / 1000).toFixed()}`;

  if (!cacheStore.has(source1Key)) {
    await apiConsumer.get('source1')
      .then(({ flights }: Discovery) => {
        cacheStore.set(source1Key, flights);
      })
      .catch(() => {
        retry = true;
      });
  }

  if (!cacheStore.has(source2Key)) {
    await apiConsumer.get('source2')
      .then(({ flights }: Discovery) => {
        cacheStore.set(source2Key, flights);
      })
      .catch(() => {
        retry = true;
      });
  }

  if (retry) {
    if (attemps === 2) {
      throw new ApiError(503, 'External APIs unavailable');
    }

    return fetchAndRetry(attemps + 1);
  }

  const source1Flights = cacheStore.get(source1Key);
  const source2Flights = cacheStore.get(source2Key);

  cacheStore.clear();

  return [source1Flights, source2Flights];
};
