#!/usr/bin/env node

import { PORT, HOSTNAME } from '@config/index';
import { logger } from '@utils/logger';

import app from '@app';

app.listen(PORT, HOSTNAME, () => {
  logger.info(`ENV: ${process.env.NODE_ENV}`);
  logger.info(`Listening on http://${HOSTNAME}:${PORT}`);
});
