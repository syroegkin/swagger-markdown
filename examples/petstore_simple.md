Swagger Petstore (Simple)
=========================
A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification

**Version:** 1.0.0

**Terms of service:**  
http://helloreverb.com/terms/

**Contact information:**  
Swagger API team  
foo@example.com  
http://swagger.io  

**License:** [MIT](http://opensource.org/licenses/MIT)

### /pets
---
##### ***GET***
**Description:** Returns all pets from the system that the user has access to

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| tags | query | tags to filter by | No | array |
| limit | query | maximum number of results to return | No | integer |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | pet response |
| default | unexpected error |

##### ***POST***
**Description:** Creates a new pet in the store.  Duplicates are allowed

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| pet | body | Pet to add to the store | Yes | undefined |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | pet response |
| default | unexpected error |

### /pets/{id}
---
##### ***GET***
**Description:** Returns a user based on a single ID, if the user does not have access to the pet

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID of pet to fetch | Yes | integer |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | pet response |
| default | unexpected error |

##### ***DELETE***
**Description:** deletes a single pet based on the ID supplied

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID of pet to delete | Yes | integer |

**Responses**

| Code | Description |
| ---- | ----------- |
| 204 | pet deleted |
| default | unexpected error |
