# URL Shortener

## Setup

This application uses [shortid](https://www.npmjs.com/package/shortid) library. To run multiple instances and make sure there aren't any collisions, set this env. It should be an integer between 0 and 16.
```
NODE_UNIQUE_ID
```

To run the project.

1. Copy the `.env-example` and fill the environment variables.
2. Run `npm install`
3. Then `npm start`
4. To run the tests `npm test` (make sure you have a mongodb instance running)
5. To run the tests with coverage `npm run coverage`

Current coverage:
```
====== Coverage summary =======
Statements   : 92.42% ( 61/66 )
Branches     : 91.67% ( 11/12 )
Functions    : 87.5% ( 7/8 )
Lines        : 92.06% ( 58/63 )
===============================
```

Alternatively you can simply use `docker-compose`, for that, run the following command:

```
docker-compose up
```
It should be accepting requests on port `http://localhost:8081`.
URL will expire after 60 seconds by default.

## Shortening
The service gets an url as parameter, the shortened URL has the following rules:

1. Minimum of 5 and maximum of 36 characters.
2. Only letters and numbers.
3. The URL expires after some time

## API

### GET /health
It will respond with 200 if the server is responding.

### GET /:id
It will redirect you to the shortened url.

### POST /shorten
Request body:
```
{
  url: "www.yourl.com"
}
```

Response body:
```
{
  newUrl: "http://localhost:8081/hash123",
  expiresAt: "3423423424"
}
```
