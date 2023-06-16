# Demonstration of how to support both XML and JSON in ExpressJS

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Example using HTTPie

```sh
~ ❯ echo '<?xml version="1.0" encoding="UTF-8" ?>
    <root>
      <email>foo@bar.com</email>
      <password>12331233</password>
    </root>' | http -v POST http://localhost:3000/users accept:'application/xml' content-type:'application/xml'
POST /users HTTP/1.1
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 116
Host: localhost:3000
User-Agent: HTTPie/3.2.2
accept: application/xml
content-type: application/xml

<?xml version="1.0" encoding="UTF-8" ?>
<root>
  <email>foo@bar.com</email>
  <password>12331233</password>
</root>


HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 68
Content-Type: application/xml; charset=utf-8
Date: Fri, 16 Jun 2023 10:27:18 GMT
ETag: W/"44-YKlv2x6zK382eOpUMWVh4or7zYQ"
Keep-Alive: timeout=5
X-Powered-By: Express

<root>
  <email>foo@bar.com</email>
  <password>12331233</password>
</root>
```

```sh
~ ❯ http -v localhost:3000/users email=foo@bar.com password=12341234
POST /users HTTP/1.1
Accept: application/json, */*;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 48
Content-Type: application/json
Host: localhost:3000
User-Agent: HTTPie/3.2.2

{
    "email": "foo@bar.com",
    "password": "12341234"
}


HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 45
Content-Type: application/json; charset=utf-8
Date: Fri, 16 Jun 2023 10:31:33 GMT
ETag: W/"2d-1mRyz0bx6ggFTK03Q5izf0i4Etc"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "email": "foo@bar.com",
    "password": "12341234"
}
```

