# PetStore on Heroku
**This example has a working backend hosted in Heroku**

You can try all HTTP operation described in this Swagger spec.

Find source code of this API [here](https://github.com/mohsen1/petstore-api)

## Version: 1.0.0

**Schemes:** http, https

---
### /

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| limit | query | number of pets to return | No | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | List all pets | [ [Pet](#pet) ] |

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| pet | body | The pet JSON you want to post | Yes | [Pet](#pet) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Make a new pet |

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| pet | body | The pet JSON you want to post | Yes | [Pet](#pet) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Updates the pet |

### /{petId}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| petId | path | ID of the pet | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Sends the pet with pet Id |

---
### Models

#### Pet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | No |
| birthday | integer |  | No |
