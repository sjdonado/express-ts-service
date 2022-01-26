import pino, { LoggerOptions } from 'pino';

const options: LoggerOptions = {
  transport: {
    targets: [
      {
        level: 'debug',
        target: 'pino-pretty',
        options: {
          translateTime: true,
        },
      },
      {
        level: 'error',
        target: 'pino-pretty',
        options: {
          translateTime: true,
          colorize: false,
          destination: 'error.log',
          append: false,
        },
      },
    ],
  },
};

export const logger = pino(options);

export const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};
