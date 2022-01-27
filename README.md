# Express TS service
> DEMO: https://express-ts-service.herokuapp.com/

## How to run?
- Development: `yarn && yarn dev`
- Production: `yarn && yarn start`

## Routes

| Prefix Verb/header      | Authorization            | Path
| :-----------------------| :------------------------| :-------------------
| GET                     | PUBLIC                   | /v1/discovery/ping
| GET                     | PUBLIC                   | /v1/discovery

```shell
  curl "http://localhost:3000/v1/discovery/"
```

## Error responses

- `Status code 404`
```json
{
  "status": 404,
  "data": null,
  "error": "Not found"
}
```

- `Status code 500`
```json
{
  "status": 500,
  "data": null,
  "error": "Something went wrong"
}
```

- `Status code 500`
```json
{
  "status": 503,
  "data": null,
  "error": "External APIs unavailable"
}
```

## Success response
- http://localhost:3000/v1/discovery/ping
`Status code 200`
```json
{
  "status": 200,
  "data": null
}
```

- http://localhost:3000/v1/discovery
`Status code 200`
```json
{
  "status": 200,
  "data": {
    "flights": [
      {
        "slices": [
          {
            "origin_name": "Schonefeld",
            "destination_name": "Stansted",
            "departure_date_time_utc": "2019-08-08T04:30:00.000Z",
            "arrival_date_time_utc": "2019-08-08T06:25:00.000Z",
            "flight_number": "144",
            "duration": 115
          },
          {
            "origin_name": "Stansted",
            "destination_name": "Schonefeld",
            "departure_date_time_utc": "2019-08-10T06:50:00.000Z",
            "arrival_date_time_utc": "2019-08-10T08:40:00.000Z",
            "flight_number": "145",
            "duration": 110
          }
        ],
        "price": 129
      },
      {
        "slices": [
          {
            "origin_name": "Schonefeld",
            "destination_name": "Stansted",
            "departure_date_time_utc": "2019-08-08T20:25:00.000Z",
            "arrival_date_time_utc": "2019-08-08T22:25:00.000Z",
            "flight_number": "8545",
            "duration": 120
          },
          {
            "origin_name": "Stansted",
            "destination_name": "Schonefeld",
            "departure_date_time_utc": "2019-08-10T18:00:00.000Z",
            "arrival_date_time_utc": "2019-08-10T20:00:00.000Z",
            "flight_number": "8544",
            "duration": 120
          }
        ],
        "price": 117.01
      },
      ...
    ]
  }
}
```

## Architectural decisions

- ESLint rules: airbnb-base
- Test suite: jest + supertest
- Logger: pino + pino-pretty (fastest)
- MVC design pattern
- Serializers: Easily scalable thanks to OOP (views)
- Error handling through middlewares
- Models: Business logic
- Services: Separation of concerns
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

## Load test
```bash
$ npx loadtest -n 100 -c 5 http://localhost:3000/v1/discovery
[Thu Jan 27 2022 07:21:17 GMT+0100 (Central European Standard Time)] INFO Requests: 0 (0%), requests per second: 0, mean latency: 0 ms
[Thu Jan 27 2022 07:21:22 GMT+0100 (Central European Standard Time)] INFO Requests: 48 (48%), requests per second: 10, mean latency: 440.1 ms
[Thu Jan 27 2022 07:21:22 GMT+0100 (Central European Standard Time)] INFO Errors: 30, accumulated errors: 30, 62.5% of total requests
[Thu Jan 27 2022 07:21:27 GMT+0100 (Central European Standard Time)] INFO Requests: 92 (92%), requests per second: 9, mean latency: 596.8 ms
[Thu Jan 27 2022 07:21:27 GMT+0100 (Central European Standard Time)] INFO Errors: 25, accumulated errors: 55, 59.8% of total requests
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO Target URL:          http://localhost:3000/v1/discovery
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO Max requests:        100
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO Concurrency level:   5
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO Agent:               none
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO Completed requests:  100
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO Total errors:        59
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO Total time:          11.687944292000001 s
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO Requests per second: 9
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO Mean latency:        559.5 ms
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO Percentage of the requests served within a certain time
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO   50%      282 ms
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO   90%      1247 ms
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO   95%      1497 ms
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO   99%      2426 ms
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO  100%      2426 ms (longest request)
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO  100%      2426 ms (longest request)
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO   500:   57 errors
[Thu Jan 27 2022 07:21:29 GMT+0100 (Central European Standard Time)] INFO   503:   2 errors
```
