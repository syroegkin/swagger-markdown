# Swagger Petstore - OpenAPI 3.0
This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about
Swagger at [https://swagger.io](https://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!
You can now help us improve the API whether it's by making changes to the definition itself or to the code.
That way, with time, we can improve the API in general, and expose some of the new features in OAS3.

Some useful links:

- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)
- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)

## Version: 1.0.11

### Terms of service
http://swagger.io/terms/

**Contact information:**  
apiteam@swagger.io  

**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

[Find out more about Swagger](http://swagger.io)

---
## pet
Everything about your Pets
[Find out more](http://swagger.io)

### /pet

#### PUT
##### Summary

Update an existing pet

##### Description

Update an existing pet by Id

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | Invalid ID supplied |
| 404 | Pet not found |
| 422 | Validation exception |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

#### POST
##### Summary

Add a new pet to the store

##### Description

Add a new pet to the store

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | Invalid input |
| 422 | Validation exception |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### /pet/findByStatus

#### GET
##### Summary

Finds Pets by status

##### Description

Multiple status values can be provided with comma separated strings

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| status | query | Status values that need to be considered for filter | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid status value |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### /pet/findByTags

#### GET
##### Summary

Finds Pets by tags

##### Description

Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| tags | query | Tags to filter by | No | [ string ] |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid tag value |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### /pet/{petId}

#### GET
##### Summary

Find pet by ID

##### Description

Returns a single pet

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| petId | path | ID of pet to return | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid ID supplied |
| 404 | Pet not found |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| api_key |  |  |
| petstore_auth | write:pets | read:pets |

#### POST
##### Summary

Updates a pet in the store with form data

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| petId | path | ID of pet that needs to be updated | Yes | long |
| name | query | Name of pet that needs to be updated | No | string |
| status | query | Status of pet that needs to be updated | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid input |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

#### DELETE
##### Summary

Deletes a pet

##### Description

delete a pet

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| api_key | header |  | No | string |
| petId | path | Pet id to delete | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid pet value |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### /pet/{petId}/uploadImage

#### POST
##### Summary

uploads an image

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| petId | path | ID of pet to update | Yes | long |
| additionalMetadata | query | Additional Metadata | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

---
## store
Access to Petstore orders
[Find out more about our store](http://swagger.io)

### /store/inventory

#### GET
##### Summary

Returns pet inventories by status

##### Description

Returns a map of status codes to quantities

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| api_key |  |

### /store/order

#### POST
##### Summary

Place an order for a pet

##### Description

Place a new order in the store

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid input |
| 422 | Validation exception |

### /store/order/{orderId}

#### GET
##### Summary

Find purchase order by ID

##### Description

For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| orderId | path | ID of order that needs to be fetched | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid ID supplied |
| 404 | Order not found |

#### DELETE
##### Summary

Delete purchase order by ID

##### Description

For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| orderId | path | ID of the order that needs to be deleted | Yes | long |

##### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid ID supplied |
| 404 | Order not found |

---
## user
Operations about user

### /user

#### POST
##### Summary

Create user

##### Description

This can only be done by the logged in user.

##### Responses

| Code | Description |
| ---- | ----------- |
| default | successful operation |

### /user/createWithList

#### POST
##### Summary

Creates list of users with given input array

##### Description

Creates list of users with given input array

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| default | successful operation |

### /user/login

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

| Code | Description |
| ---- | ----------- |
| 200 | successful operation<br>**Headers:**<br>**X-Rate-Limit**: calls per hour allowed by the user<br>**X-Expires-After**: date in UTC when token expires<br> |
| 400 | Invalid username/password supplied |

### /user/logout

#### GET
##### Summary

Logs out current logged in user session

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| default | successful operation |

### /user/{username}

#### GET
##### Summary

Get user by user name

##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | path | The name that needs to be fetched. Use user1 for testing.  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 400 | Invalid username supplied |
| 404 | User not found |

#### PUT
##### Summary

Update user

##### Description

This can only be done by the logged in user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | path | name that need to be deleted | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| default | successful operation |

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
