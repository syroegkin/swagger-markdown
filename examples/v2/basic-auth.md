# Basic Auth Example
An example for how to use Basic Auth with Swagger.
Server code is available [here](https://github.com/mohsen1/basic-auth-server). It's running on Heroku.

**User Name and Password**

* User Name: `user`
* Password: `pass`

## Version: 1.0.0

### Security
**basicAuth**  

| basic | *Basic* |
| ----- | ------- |
| Description | HTTP Basic Authentication. Works over `HTTP` and `HTTPS` |

**Schemes:** http, https

---
### /

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Will send `Authenticated` if authentication is succesful, otherwise it will send `Unauthorized` |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| basicAuth |  |
