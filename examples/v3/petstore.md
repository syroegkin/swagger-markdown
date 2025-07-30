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
**Update an existing pet**

Update an existing pet by Id

#### Request Body

| Required | Schema |
| -------- | ------ |
|  Yes | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br>**application/x-www-form-urlencoded**: [Pet](#pet)<br> | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br>**application/x-www-form-urlencoded**: [Pet](#pet)<br> | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br>**application/x-www-form-urlencoded**: [Pet](#pet)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br> |
| 400 | Invalid ID supplied |  |
| 404 | Pet not found |  |
| 422 | Validation exception |  |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### [POST] /pet
**Add a new pet to the store**

#### Request Body

| Required | Schema |
| -------- | ------ |
|  Yes | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br>**application/x-www-form-urlencoded**: [Pet](#pet)<br> | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br>**application/x-www-form-urlencoded**: [Pet](#pet)<br> | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br>**application/x-www-form-urlencoded**: [Pet](#pet)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br> |
| 400 | Invalid input |  |
| 422 | Validation exception |  |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### [GET] /pet/findByStatus
**Finds Pets by status**

Multiple status values can be provided with comma separated strings

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| status | query | Status values that need to be considered for filter | No | string, <br>**Available values:** "available", "pending", "sold", <br>**Default:** available |

#### Responses

| Code | Description | Schema | Links |
| ---- | ----------- | ------ | ----- |
| 200 | successful operation | **application/json**: [ [Pet](#pet) ]<br>**application/xml**: [ [Pet](#pet) ]<br> | **address**<br>Address link description<br>Parameters {<br>"userId": "$request.path.id",<br>"entityId": "$request.entity.id"<br>}<br> |
| 400 | Invalid status value |  |  |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### ~~[GET] /pet/findByTags~~

***DEPRECATED***

**Finds Pets by tags**

Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| tags | query | Tags to filter by | No | [ string ] |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [ [Pet](#pet) ]<br>**application/xml**: [ [Pet](#pet) ]<br> |
| 400 | Invalid tag value |  |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### [GET] /pet/{petId}
**Find pet by ID**

Returns a single pet

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| petId | path | ID of pet to return | Yes | long |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [Pet](#pet)<br>**application/xml**: [Pet](#pet)<br> |
| 400 | Invalid ID supplied |  |
| 404 | Pet not found |  |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| api_key |  |  |
| petstore_auth | write:pets | read:pets |

### [POST] /pet/{petId}
**Updates a pet in the store with form data**

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| petId | path | ID of pet that needs to be updated | Yes | long |
| name | query | Name of pet that needs to be updated | No | string |
| status | query | Status of pet that needs to be updated | No | string |

#### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid input |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### [DELETE] /pet/{petId}
**Deletes a pet**

delete a pet

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| api_key | header |  | No | string |
| petId | path | Pet id to delete | Yes | long |

#### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid pet value |

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

### [POST] /pet/{petId}/uploadImage
**uploads an image**

##### Parameters

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

##### Security

| Security Schema | Scopes |  |
| --------------- | ------ | --- |
| petstore_auth | write:pets | read:pets |

---
## store
Access to Petstore orders
[Find out more about our store](http://swagger.io)

### [GET] /store/inventory
**Returns pet inventories by status**

Returns a map of status codes to quantities

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: object<br> |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| api_key |  |

### [POST] /store/order
**Place an order for a pet**

Place a new order in the store

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Order](#order)<br>**application/xml**: [Order](#order)<br>**application/x-www-form-urlencoded**: [Order](#order)<br> | **application/json**: [Order](#order)<br>**application/xml**: [Order](#order)<br>**application/x-www-form-urlencoded**: [Order](#order)<br> | **application/json**: [Order](#order)<br>**application/xml**: [Order](#order)<br>**application/x-www-form-urlencoded**: [Order](#order)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [Order](#order)<br> |
| 400 | Invalid input |  |
| 422 | Validation exception |  |

### [GET] /store/order/{orderId}
**Find purchase order by ID**

For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| orderId | path | ID of order that needs to be fetched | Yes | long |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [Order](#order)<br>**application/xml**: [Order](#order)<br> |
| 400 | Invalid ID supplied |  |
| 404 | Order not found |  |

### [DELETE] /store/order/{orderId}
**Delete purchase order by ID**

For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| orderId | path | ID of the order that needs to be deleted | Yes | long |

#### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid ID supplied |
| 404 | Order not found |

---
## user
Operations about user

### [POST] /user
**Create user**

This can only be done by the logged in user.

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br>**application/x-www-form-urlencoded**: [User](#user)<br> | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br>**application/x-www-form-urlencoded**: [User](#user)<br> | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br>**application/x-www-form-urlencoded**: [User](#user)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | successful operation | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br> |

### [POST] /user/createWithList
**Creates list of users with given input array**

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [ [User](#user) ]<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful operation | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br> |
| default | successful operation |  |

### [GET] /user/login
**Logs user into the system**

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | query | The user name for login | No | string |
| password | query | The password for login in clear text | No | string |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation<br>**Headers:**<br>**X-Rate-Limit**: calls per hour allowed by the user<br>**X-Expires-After**: date in UTC when token expires<br> | **application/xml**: string<br>**application/json**: string<br> |
| 400 | Invalid username/password supplied |  |

### [GET] /user/logout
**Logs out current logged in user session**

#### Responses

| Code | Description |
| ---- | ----------- |
| default | successful operation |

### [GET] /user/{username}
**Get user by user name**

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | path | The name that needs to be fetched. Use user1 for testing.  | Yes | string |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br> |
| 400 | Invalid username supplied |  |
| 404 | User not found |  |

### [PUT] /user/{username}
**Update user**

This can only be done by the logged in user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | path | name that need to be deleted | Yes | string |

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br>**application/x-www-form-urlencoded**: [User](#user)<br> | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br>**application/x-www-form-urlencoded**: [User](#user)<br> | **application/json**: [User](#user)<br>**application/xml**: [User](#user)<br>**application/x-www-form-urlencoded**: [User](#user)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| default | successful operation |

### [DELETE] /user/{username}
**Delete user**

This can only be done by the logged in user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| username | path | The name that needs to be deleted | Yes | string |

#### Responses

| Code | Description |
| ---- | ----------- |
| 400 | Invalid username supplied |
| 404 | User not found |

---
### Schemas

### Schema: Order

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "example": 10
    },
    "petId": {
      "type": "integer",
      "format": "int64",
      "example": 198772
    },
    "quantity": {
      "type": "integer",
      "format": "int32",
      "example": 7
    },
    "shipDate": {
      "type": "string",
      "format": "date-time"
    },
    "status": {
      "type": "string",
      "description": "Order Status",
      "example": "approved",
      "enum": [
        "placed",
        "approved",
        "delivered"
      ]
    },
    "complete": {
      "type": "boolean"
    }
  },
  "xml": {
    "name": "order"
  }
}
```

### Schema: Customer

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "example": 100000
    },
    "username": {
      "type": "string",
      "example": "fehguy"
    },
    "address": {
      "type": "array",
      "xml": {
        "name": "addresses",
        "wrapped": true
      },
      "items": {
        "$ref": "#/components/schemas/Address"
      }
    }
  },
  "xml": {
    "name": "customer"
  }
}
```

### Schema: Address

```json
{
  "type": "object",
  "properties": {
    "street": {
      "type": "string",
      "example": "437 Lytton"
    },
    "city": {
      "type": "string",
      "example": "Palo Alto"
    },
    "state": {
      "type": "string",
      "example": "CA"
    },
    "zip": {
      "type": "string",
      "example": "94301"
    }
  },
  "xml": {
    "name": "address"
  }
}
```

### Schema: Category

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "example": 1
    },
    "name": {
      "type": "string",
      "example": "Dogs"
    }
  },
  "xml": {
    "name": "category"
  }
}
```

### Schema: User

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "example": 10
    },
    "username": {
      "type": "string",
      "example": "theUser"
    },
    "firstName": {
      "type": "string",
      "example": "John"
    },
    "lastName": {
      "type": "string",
      "example": "James"
    },
    "email": {
      "type": "string",
      "example": "john@email.com"
    },
    "password": {
      "type": "string",
      "example": "12345"
    },
    "phone": {
      "type": "string",
      "example": "12345"
    },
    "userStatus": {
      "type": "integer",
      "description": "User Status",
      "format": "int32",
      "example": 1
    }
  },
  "xml": {
    "name": "user"
  }
}
```

### Schema: Tag

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "name": {
      "type": "string"
    }
  },
  "xml": {
    "name": "tag"
  }
}
```

### Schema: Pet

```json
{
  "required": [
    "name",
    "photoUrls"
  ],
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "example": 10
    },
    "name": {
      "type": "string",
      "example": "doggie"
    },
    "category": {
      "$ref": "#/components/schemas/Category"
    },
    "photoUrls": {
      "type": "array",
      "xml": {
        "wrapped": true
      },
      "items": {
        "type": "string",
        "xml": {
          "name": "photoUrl"
        }
      }
    },
    "tags": {
      "type": "array",
      "xml": {
        "wrapped": true
      },
      "items": {
        "$ref": "#/components/schemas/Tag"
      }
    },
    "status": {
      "type": "string",
      "description": "pet status in the store",
      "enum": [
        "available",
        "pending",
        "sold"
      ]
    }
  },
  "xml": {
    "name": "pet"
  }
}
```

### Schema: ApiResponse

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "integer",
      "format": "int32"
    },
    "type": {
      "type": "string"
    },
    "message": {
      "type": "string"
    }
  },
  "xml": {
    "name": "##default"
  }
}
```

### Request Body: Pet
Pet object that needs to be added to the store
#### Media Type: application/json

```json
{
  "$ref": "#/components/schemas/Pet"
}
```

#### Media Type: application/xml

```json
{
  "$ref": "#/components/schemas/Pet"
}
```

### Request Body: UserArray
List of user object
#### Media Type: application/json

```json
{
  "type": "array",
  "items": {
    "$ref": "#/components/schemas/User"
  }
}
```
