# Swagger Petstore
This is a sample server Petstore server.

[Learn about Swagger](http://swagger.io) or join the IRC channel `#swagger` on irc.freenode.net.

For this sample, you can use the api key `special-key` to test the authorization filters

## Version: 1.0.0

### Terms of service
http://helloreverb.com/terms/

**Contact information:**  
apiteam@swagger.io  

**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

### Security
**api_key**  

| apiKey | *API Key* |
| ------ | --------- |
| Name | api_key |
| In | header |

**petstore_auth**  

| oauth2 | *OAuth 2.0* |
| ------ | ----------- |
| Authorization URL | http://petstore.swagger.io/api/oauth/dialog |
| Flow | implicit |
| **Scopes** |  |
| write_pets | modify pets in your account |
| read_pets | read your pets |

**Schemes:** http

---
### /pets

#### POST
##### Summary

Add a new pet to the store

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| body | body | Pet object that needs to be added to the store | No | [Pet](#pet) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 405 | Invalid input<br>**Headers:**<br>**X-Rate-Limit-Limit** (integer): The number of allowed requests in the current period<br>**X-Rate-Limit-Remaining** (integer): The number of remaining requests in the current period<br>**X-Rate-Limit-Reset** (integer): The number of seconds left in the current period<br> |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write_pets | read_pets |

#### PUT
##### Summary

Update an existing pet

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| body | body | Pet object that needs to be added to the store | No | [Pet](#pet) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid ID supplied |
| 404 | Pet not found |
| 405 | Validation exception |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write_pets | read_pets |

### /pets/findByStatus

#### GET
##### Summary

Finds Pets by status

##### Description

Multiple status values can be provided with comma seperated strings

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| status | query | Status values that need to be considered for filter | No | [ string ] |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [ [Pet](#pet) ] |
| 400 | Invalid status value |  |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write_pets | read_pets |

### /pets/findByTags

#### GET
##### Summary

Finds Pets by tags

##### Description

Muliple tags can be provided with comma seperated strings. Use tag1, tag2, tag3 for testing.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| tags | query | Tags to filter by | No | [ string ] |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [ [Pet](#pet) ] |
| 400 | Invalid tag value |  |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write_pets | read_pets |

### /pets/{petId}

#### GET
##### Summary

Find pet by ID

##### Description

Returns a pet when ID < 10.  ID > 10 or nonintegers will simulate API error conditions

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| petId | path | ID of pet that needs to be fetched | Yes | long |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Pet](#pet) |
| 400 | Invalid ID supplied |  |
| 404 | Pet not found |  |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| api_key |  |  |
| petstore_auth | write_pets | read_pets |

#### POST
##### Summary

Updates a pet in the store with form data

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| petId | path | ID of pet that needs to be updated | Yes | string |
| name | formData | Updated name of the pet | Yes | string |
| status | formData | Updated status of the pet | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 405 | Invalid input |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write_pets | read_pets |

#### DELETE
##### Summary

Deletes a pet

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| api_key | header |  | Yes | string |
| petId | path | Pet id to delete | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid pet value |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write_pets | read_pets |

---
### /stores/order

#### POST
##### Summary

Place an order for a pet

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| body | body | order placed for purchasing the pet | No | [Order](#order) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Order](#order) |
| 400 | Invalid Order |  |

### /stores/order/{orderId}

#### GET
##### Summary

Find purchase order by ID

##### Description

For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| orderId | path | ID of pet that needs to be fetched | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Order](#order) |
| 400 | Invalid ID supplied |  |
| 404 | Order not found |  |

#### DELETE
##### Summary

Delete purchase order by ID

##### Description

For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| orderId | path | ID of the order that needs to be deleted | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid ID supplied |
| 404 | Order not found |

---
### /users

#### POST
##### Summary

Create user

##### Description

This can only be done by the logged in user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| body | body | Created user object | No | [User](#user) |

##### Responses

| Code | Description |
| ---- | ----------- |
| default | successful operation |

### /users/createWithArray

#### POST
##### Summary

Creates list of users with given input array

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| body | body | List of user object | No | [ [User](#user) ] |

##### Responses

| Code | Description |
| ---- | ----------- |
| default | successful operation |

### /users/createWithList

#### POST
##### Summary

Creates list of users with given input array

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| body | body | List of user object | No | [ [User](#user) ] |

##### Responses

| Code | Description |
| ---- | ----------- |
| default | successful operation |

### /users/login

#### GET
##### Summary

Logs user into the system

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | query | The user name for login | No | string |
| password | query | The password for login in clear text | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | string |
| 400 | Invalid username/password supplied |  |

### /users/logout

#### GET
##### Summary

Logs out current logged in user session

##### Description

##### Responses

| Code | Description |
| ---- | ----------- |
| default | successful operation |

### /users/{username}

#### GET
##### Summary

Get user by user name

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | path | The name that needs to be fetched. Use user1 for testing. | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [User](#user) |
| 400 | Invalid username supplied |  |
| 404 | User not found |  |

#### PUT
##### Summary

Updated user

##### Description

This can only be done by the logged in user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | path | name that need to be deleted | Yes | string |
| body | body | Updated user object | No | [User](#user) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid user supplied |
| 404 | User not found |

#### DELETE
##### Summary

Delete user

##### Description

This can only be done by the logged in user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | path | The name that needs to be deleted | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid username supplied |
| 404 | User not found |

---
### Models

#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| username | string |  | No |
| firstName | string |  | No |
| lastName | string |  | No |
| email | string |  | No |
| password | string |  | No |
| phone | string |  | No |
| userStatus | integer | User Status | No |

#### Category

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| name | string |  | No |

#### Pet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| category | [Category](#category) |  | No |
| name | string | *Example:* `"doggie"` | Yes |
| photoUrls | [ string ] |  | Yes |
| tags | [ [Tag](#tag) ] |  | No |
| status | string | pet status in the store | No |

#### Tag

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| name | string |  | No |

#### Order

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| petId | long |  | No |
| quantity | integer |  | No |
| shipDate | dateTime |  | No |
| status | string | Order Status | No |
| complete | boolean |  | No |
