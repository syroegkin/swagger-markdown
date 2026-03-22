# Swagger Petstore (Simple)
A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification

## Version: 1.0.0

### Terms of service
http://helloreverb.com/terms/

**Contact information:**  
Swagger API team  
http://swagger.io  
foo@example.com  

**License:** [MIT](http://opensource.org/licenses/MIT)

**Schemes:** http

---
### /pets

#### GET
##### Description

Returns all pets from the system that the user has access to

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| tags | query | tags to filter by | No | [ string ] |
| limit | query | maximum number of results to return | No | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | pet response | [ [pet](#pet-model) ] |
| default | unexpected error | [errorModel](#errormodel-model) |

#### POST
##### Description

Creates a new pet in the store.  Duplicates are allowed

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| pet | body | Pet to add to the store | Yes | [newPet](#newpet-model) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | pet response | [pet](#pet-model) |
| default | unexpected error | [errorModel](#errormodel-model) |

### /pets/{id}

#### GET
##### Description

Returns a user based on a single ID, if the user does not have access to the pet

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path | ID of pet to fetch | Yes | long |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | pet response<br><br>**Example** (*application/json*):<br><pre>{<br>  "id": 18,<br>  "name": "Doggo",<br>  "tag": "afuera"<br>}</pre> | [pet](#pet-model) |
| default | unexpected error | [errorModel](#errormodel-model) |

#### DELETE
##### Description

deletes a single pet based on the ID supplied

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path | ID of pet to delete | Yes | long |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 204 | pet deleted |  |
| default | unexpected error | [errorModel](#errormodel-model) |

---
### Models

#### pet Model

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | Yes |
| name | string |  | Yes |
| tag | string |  | No |

#### newPet Model

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| name | string | Pet name<br>*Example:* `"doggie dog"` | Yes |
| tag | string |  | No |

#### errorModel Model

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| code | integer |  | Yes |
| message | string |  | Yes |
