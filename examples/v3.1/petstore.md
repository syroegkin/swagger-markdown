# Swagger Petstore - OpenAPI 3.1
This is a sample Pet Store Server based on the OpenAPI 3.1 specification.  You can find out more about
Swagger at [https://swagger.io](https://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!
You can now help us improve the API whether it's by making changes to the definition itself or to the code.
That way, with time, we can improve the API in general, and expose some of the new features in OAS3.

Some useful links:

- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)
- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)

## Version: 1.0.12

### Terms of service
https://swagger.io/terms/

**Contact information:**  
apiteam@swagger.io  

**License:** [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)

[Find out more about Swagger](https://swagger.io)

### Available authorizations
#### petstore_auth (OAuth2, implicit)
Authorization URL: https://petstore3.swagger.io/oauth/authorize  
Scopes:

- write:pets: modify pets in your account  
- read:pets: read your pets  

#### api_key (API Key Authentication)
**Name:** api_key  
**In:** header  

---
## pet
Everything about your Pets
[Find out more](http://swagger.io)

### [PUT] /pet
**Update an existing pet.**

Update an existing pet by Id.

#### Request Body

Update an existent pet in the store

| Required | Schema |
| -------- | ------ |
|  Yes | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br>**application/x-www-form-urlencoded**: [Pet](#pet)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br> |
| 400 | Invalid ID supplied |  |
| 404 | Pet not found |  |
| 422 | Validation exception |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### [POST] /pet
**Add a new pet to the store.**

#### Request Body

Create a new pet in the store

| Required | Schema |
| -------- | ------ |
|  Yes | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br>**application/x-www-form-urlencoded**: [Pet](#pet)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br> |
| 400 | Invalid input |  |
| 422 | Validation exception |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### [GET] /pet/findByStatus
**Finds Pets by status.**

Multiple status values can be provided with comma separated strings.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| status | query | Status values that need to be considered for filter | No | string, <br>**Available values:** "available", "pending", "sold", <br>**Default:** available |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [ [Pet](#pet) ]<br>**application/xml**: [ [Pet](#pet) ]<br> |
| 400 | Invalid status value |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### [GET] /pet/findByTags
**Finds Pets by tags.**

Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| tags | query | Tags to filter by | No | [ string ] |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [ [Pet](#pet) ]<br>**application/xml**: [ [Pet](#pet) ]<br> |
| 400 | Invalid tag value |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### [GET] /pet/{petId}
**Find pet by identifier.**

Returns a single pet.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| petId | path | ID of pet to return | Yes | long |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br> |
| 400 | Invalid ID supplied |  |
| 404 | Pet not found |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| api_key |  |  |
| petstore_auth | write:pets | read:pets |

### [POST] /pet/{petId}
**Updates a pet in the store with form data.**

update a pet via the form data.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| petId | path | ID of pet that needs to be updated | Yes | long |
| name | query | Name of pet that needs to be updated | No | string |
| status | query | Status of pet that needs to be updated | No | string |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successfully updated |  |
| 400 | Invalid input |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### [DELETE] /pet/{petId}
**Deletes a pet.**

delete a pet.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| api_key | header |  | No | string |
| petId | path | Pet id to delete | Yes | long |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation |  |
| 400 | Invalid pet value |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### [POST] /pet/{petId}/uploadImage
**Uploads an image.**

Upload an image of pet.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| petId | path | ID of pet to update | Yes | long |
| additionalMetadata | query | Additional Metadata | No | string |

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/octet-stream**: binary<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [ApiResponse](#apiresponse)<br> |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

---
## store
Access to Petstore orders
[Find out more about our store](http://swagger.io)

### [GET] /store/inventory
**Returns pet inventories by status.**

Returns a map of status codes to quantities.

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: object<br> |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| api_key |  |

### [POST] /store/order
**Place an order for a pet.**

Place a new order in the store.

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Order](#order)<br>**application/xml**: [Order](#order)<br>**application/x-www-form-urlencoded**: [Order](#order)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [Order](#order)<br> |
| 400 | Invalid input |  |
| 422 | Validation exception |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

### [GET] /store/order/{orderId}
**Find purchase order by identifier.**

For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| orderId | path | ID of order that needs to be fetched | Yes | long |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [Order](#order)<br>**application/xml**: [Order](#order)<br> |
| 400 | Invalid ID supplied |  |
| 404 | Order not found |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

### [DELETE] /store/order/{orderId}
**Delete purchase order by identifier.**

For valid response try integer IDs with value < 1000. Anything above 1000 or non-integers will generate API errors.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| orderId | path | ID of the order that needs to be deleted | Yes | long |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation |  |
| 400 | Invalid ID supplied |  |
| 404 | Order not found |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

---
## user
Operations about user

### [POST] /user
**Create user.**

This can only be done by the logged in user.

#### Request Body

Created user object

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br>**application/x-www-form-urlencoded**: [User](#user)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br> |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

### [POST] /user/createWithList
**Creates list of users with given input array.**

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [ [User](#user) ]<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br> |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

### [GET] /user/login
**Logs user into the system.**

log user into the system.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | query | The user name for login | No | string |
| password | query | The password for login in clear text | No | string |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation<br>**Headers:**<br>**X-Rate-Limit**: calls per hour allowed by the user<br>**X-Expires-After**: date in UTC when token expires<br> | **application/xml**: string<br>**application/json**: string<br> |
| 400 | Invalid username/password supplied |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

### [GET] /user/logout
**Logs out current logged in user session.**

Log user out of system.

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| default | successful operation |

### [GET] /user/{username}
**Get user by user name.**

Get user details based on username.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | path | The name that needs to be fetched. Use user1 for testing | Yes | string |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br> |
| 400 | Invalid username supplied |  |
| 404 | User not found |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

### [PUT] /user/{username}
**Update user.**

This can only be done by the logged in user.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | path | name that need to be deleted | Yes | string |

#### Request Body

Update an existent user in the store

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br>**application/x-www-form-urlencoded**: [User](#user)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

### [DELETE] /user/{username}
**Delete user.**

This can only be done by the logged in user.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | path | The name that needs to be deleted | Yes | string |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation |  |
| 400 | Invalid username supplied |  |
| 404 | User not found |  |
| default | Unexpected error | **application/json**: [Error](#error)<br> |

---
### Schemas

#### Order

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| petId | long |  | No |
| quantity | integer |  | No |
| shipDate | dateTime |  | No |
| status | string, <br>**Available values:** "placed", "approved", "delivered" | Order Status<br>*Enum:* `"placed"`, `"approved"`, `"delivered"` | No |
| complete | boolean |  | No |

#### Customer

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| username | string |  | No |
| address | [ [Address](#address) ] |  | No |

#### Address

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| street | string |  | No |
| city | string |  | No |
| state | string |  | No |
| zip | string |  | No |

#### Category

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| name | string |  | No |

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

#### Tag

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| name | string |  | No |

#### Pet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| name | string |  | Yes |
| category | [Category](#category) |  | No |
| photoUrls | [ string ] |  | Yes |
| tags | [ [Tag](#tag) ] |  | No |
| status | string, <br>**Available values:** "available", "pending", "sold" | pet status in the store<br>*Enum:* `"available"`, `"pending"`, `"sold"` | No |

#### ApiResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| code | integer |  | No |
| type | string |  | No |
| message | string |  | No |

#### Error

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| code | string |  | Yes |
| message | string |  | Yes |
