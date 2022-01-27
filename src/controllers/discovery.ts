import { NextFunction, Request, Response } from 'express';

import DiscoverySerializer from '@serializers/Discovery';
import { fetchAndRetry, mergeAndClean } from '@models/discovery';

const ping = (req: Request, res: Response, next: NextFunction) => {
  res.json(new DiscoverySerializer(null));
};

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fetchedFlights = await fetchAndRetry();
    const response = mergeAndClean(...fetchedFlights);

    res.json(new DiscoverySerializer(response));
  } catch (err) {
    next(err);
  }
};

export default {
  ping,
  fetch,
};
