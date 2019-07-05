URL Shortener
===========================

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
