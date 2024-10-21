# Swagger Sample API
A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification

## Version: 1.0.9-abcd

### Terms of service
http://helloreverb.com/terms/

**Contact information:**  
swagger api team  
http://swagger.io  

**License:** [Creative Commons 4.0 International](http://creativecommons.org/licenses/by/4.0/)

### Security
**githubAccessCode**  

| oauth2 | *OAuth 2.0* |
| ------ | ----------- |
| **Scopes** |  |
| user | Grants read/write access to profile info only. Note that this scope includes user:email and user:follow. |
| user:email | Grants read access to a user’s email addresses. |
| user:follow | Grants access to follow or unfollow other users. |
| public_repo | Grants read/write access to code, commit statuses, and deployment statuses for public repositories and organizations. |
| repo | Grants read/write access to code, commit statuses, and deployment statuses for public and private repositories and organizations. |
| repo_deployment | Grants access to deployment statuses for public and private repositories. This scope is only necessary to grant other users or services access to deployment statuses, without granting access to the code. |
| repo:status | Grants read/write access to public and private repository commit statuses. This scope is only necessary to grant other users or services access to private repository commit statuses without granting access to the code. |
| delete_repo | Grants access to delete adminable repositories. |
| notifications | Grants read access to a user’s notifications. repo also provides this access. |
| gist | Grants write access to gists. |
| read:repo_hook | Grants read and ping access to hooks in public or private repositories. |
| write:repo_hook | Grants read, write, and ping access to hooks in public or private repositories. |
| admin:repo_hook | Grants read, write, ping, and delete access to hooks in public or private repositories. |
| read:org | Read-only access to organization, teams, and membership. |
| write:org | Publicize and unpublicize organization membership. |
| admin:org | Fully manage organization, teams, and memberships. |
| read:public_key | List and view details for public keys. |
| write:public_key | Create, list, and view details for public keys. |
| admin:public_key | Fully manage public keys. |
| Flow | accessCode |
| Authorization URL | https://github.com/login/oauth/authorize |
| Token URL | https://github.com/login/oauth/access_token |

**petstoreImplicit**  

| oauth2 | *OAuth 2.0* |
| ------ | ----------- |
| **Scopes** |  |
| user | Grants read/write access to profile info only. Note that this scope includes user:email and user:follow. |
| user:email | Grants read access to a user’s email addresses. |
| user:follow | Grants access to follow or unfollow other users. |
| public_repo | Grants read/write access to code, commit statuses, and deployment statuses for public repositories and organizations. |
| repo | Grants read/write access to code, commit statuses, and deployment statuses for public and private repositories and organizations. |
| repo_deployment | Grants access to deployment statuses for public and private repositories. This scope is only necessary to grant other users or services access to deployment statuses, without granting access to the code. |
| repo:status | Grants read/write access to public and private repository commit statuses. This scope is only necessary to grant other users or services access to private repository commit statuses without granting access to the code. |
| delete_repo | Grants access to delete adminable repositories. |
| notifications | Grants read access to a user’s notifications. repo also provides this access. |
| gist | Grants write access to gists. |
| read:repo_hook | Grants read and ping access to hooks in public or private repositories. |
| write:repo_hook | Grants read, write, and ping access to hooks in public or private repositories. |
| admin:repo_hook | Grants read, write, ping, and delete access to hooks in public or private repositories. |
| read:org | Read-only access to organization, teams, and membership. |
| write:org | Publicize and unpublicize organization membership. |
| admin:org | Fully manage organization, teams, and memberships. |
| read:public_key | List and view details for public keys. |
| write:public_key | Create, list, and view details for public keys. |
| admin:public_key | Fully manage public keys. |
| Flow | implicit |
| Authorization URL | http://petstore.swagger.io/oauth/dialog |

**internalApiKey**  

| apiKey | *API Key* |
| ------ | --------- |
| In | header |
| Name | api_key |

**test-authorizer**  

| apiKey | *API Key* |
| ------ | --------- |
| Name | Authorization |
| In | header |
| x-amazon-apigateway-authtype | oauth2 |

**Schemes:** http, https

---
### /pets/{id}

#### GET
***DEPRECATED***
##### Summary

Find pets by ID

##### Description

Returns pets based on ID

**Documentation:** [Find more info here](https://swagger.io)

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id | path | ID of pet to use | Yes | [ string ] |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | pet response | [ [Pet](#pet) ] |
| default | error payload | [ErrorModel](#errormodel) |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| githubAccessCode | user |
| internalApiKey |  |

---
### Models

#### Pet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | Yes |
| tag | string |  | No |

#### ErrorModel

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| code | integer |  | Yes |
| message | string |  | Yes |
