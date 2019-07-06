# URL Shortener

This application uses short_id for random string generation.

shortid.worker(integer)
Default: process.env.NODE_UNIQUE_ID || 0

Recommendation: You typically won't want to change this.

Optional

If you are running multiple server processes then you should make sure every one has a unique worker id. Should be an integer between 0 and 16. If you do not do this there is very little chance of two servers generating the same id, but it is theoretically possible if both are generated in the exact same second and are generating the same number of ids that second and a half-dozen random numbers are all exactly the same.

Example

shortid.worker(1);

## Shortening
The service gets an url as parameter, the shortened URL has the following rules:

1. Minimum of 5 and maximum of 36 characters.
2. Only letters and numbers.
3. The URL expires after some time

## API
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
