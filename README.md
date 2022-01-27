# Express TS service

- ESLint rules: airbnb-base
- Test suite: jest + supertest
- Logger: pino + pino-pretty (fastest)

## Folder structure

- MVC design pattern
- Serializers - Easily scalable thanks to OOP
- Error handling through middleware
- Models encapsulate business logic
- Services == separation of concerns
- Retry logic: If one of the endpoints fails, the function will be called again, caching the data already fetched

## Test results
```bash
$ jest --forceExit
 PASS  tests/models/discovery.test.ts
 PASS  tests/integration/index.test.ts
 PASS  tests/integration/discovery.test.ts
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
All files        |     100 |      100 |     100 |     100 |
 src             |     100 |      100 |     100 |     100 |
  app.ts         |     100 |      100 |     100 |     100 |
 src/config      |     100 |      100 |     100 |     100 |
  index.ts       |     100 |      100 |     100 |     100 |
 src/controllers |     100 |      100 |     100 |     100 |
  discovery.ts   |     100 |      100 |     100 |     100 |
 src/models      |     100 |      100 |     100 |     100 |
  discovery.ts   |     100 |      100 |     100 |     100 |
 src/routes      |     100 |      100 |     100 |     100 |
  discovery.ts   |     100 |      100 |     100 |     100 |
 src/serializers |     100 |      100 |     100 |     100 |
  Base.ts        |     100 |      100 |     100 |     100 |
  Discovery.ts   |     100 |      100 |     100 |     100 |
  Error.ts       |     100 |      100 |     100 |     100 |
 src/services    |     100 |      100 |     100 |     100 |
  ApiConsumer.ts |     100 |      100 |     100 |     100 |
 src/utils       |     100 |      100 |     100 |     100 |
  ApiError.ts    |     100 |      100 |     100 |     100 |
  logger.ts      |     100 |      100 |     100 |     100 |
-----------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        1.935 s, estimated 2 s
Ran all test suites.
```
