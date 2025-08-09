# Uber API
Move your app forward with the Uber API

## Version: 1.0.0

**Schemes:** https

---
### /products

#### GET
##### Summary

Product Types

##### Description

The Products endpoint returns information about the *Uber* products
offered at a given location. The response includes the display name
and other details about each product, and lists the products in the
proper display order.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| latitude | query | Latitude component of location. | Yes | double |
| longitude | query | Longitude component of location. | Yes | double |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | An array of products | [ [Product](#product) ] |
| default | Unexpected error | [Error](#error) |

---
### /estimates/price

#### GET
##### Summary

Price Estimates

##### Description

The Price Estimates endpoint returns an estimated price range
for each product offered at a given location. The price estimate is
provided as a formatted string with the full price range and the localized
currency symbol.<br><br>The response also includes low and high estimates,
and the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code for
situations requiring currency conversion. When surge is active for a particular
product, its surge_multiplier will be greater than 1, but the price estimate
already factors in this multiplier.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| start_latitude | query | Latitude component of start location. | Yes | double |
| start_longitude | query | Longitude component of start location. | Yes | double |
| end_latitude | query | Latitude component of end location. | Yes | double |
| end_longitude | query | Longitude component of end location. | Yes | double |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | An array of price estimates by product | [ [Price.Estimate](#priceestimate) ] |
| default | Unexpected error | [Error](#error) |

### /estimates/time

#### GET
##### Summary

Time Estimates

##### Description

The Time Estimates endpoint returns ETAs for all products offered at a given location, with the responses expressed as integers in seconds. We recommend that this endpoint be called every minute to provide the most accurate, up-to-date ETAs.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| start_latitude | query | Latitude component of start location. | Yes | double |
| start_longitude | query | Longitude component of start location. | Yes | double |
| customer_uuid | query | Unique customer identifier to be used for experience customization. | No | string (uuid) |
| product_id | query | Unique identifier representing a specific product for a given latitude & longitude. | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | An array of products | [ [Product](#product) ] |
| default | Unexpected error | [Error](#error) |

---
### /me

#### GET
##### Summary

User Profile

##### Description

The User Profile endpoint returns information about the Uber user that has authorized with the application.

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Profile information for a user | [Profile](#profile) |
| default | Unexpected error | [Error](#error) |

### /history

#### GET
##### Summary

User Activity

##### Description

The User Activity endpoint returns data about a user's lifetime activity with Uber. The response will include pickup locations and times, dropoff locations and times, the distance of past requests, and information about which products were requested.<br><br>The history array in the response will have a maximum length based on the limit parameter. The response value count may exceed limit, therefore subsequent API requests may be necessary.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| offset | query | Offset the list of returned results by this amount. Default is zero. | No | integer |
| limit | query | Number of items to retrieve. Default is 5, maximum is 100. | No | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | History information for the given user | [Activities](#activities) |
| default | Unexpected error | [Error](#error) |

---
### Models

#### Product

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| product_id | string | Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles. | No |
| description | string | Description of product. | No |
| display_name | string | Display name of product. | No |
| capacity | string | Capacity of product. For example, 4 people. | No |
| image | string | Image URL representing the product. | No |
| expiration_date | string | Timestamp in YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM\|-HH:MM\|Z] format | No |

#### Price.Estimate

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| product_id | string | Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles | No |
| currency_code | string | [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code. | No |
| display_name | string | Display name of product. | No |
| estimate | string | Formatted string of estimate in local currency of the start location. Estimate could be a range, a single number (flat rate) or "Metered" for TAXI. | No |
| low_estimate | number | Lower bound of the estimated price. | No |
| high_estimate | number | Upper bound of the estimated price. | No |
| surge_multiplier | number | Expected surge multiplier. Surge is active if surge_multiplier is greater than 1. Price estimate already factors in the surge multiplier. | No |

#### Profile

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| first_name | string | First name of the Uber user. | No |
| last_name | string | Last name of the Uber user. | No |
| email | string | Email address of the Uber user | No |
| picture | string | Image URL of the Uber user. | No |
| promo_code | string | Promo code of the Uber user. | No |

#### Activity

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| uuid | string | Unique identifier for the activity | No |

#### Activities

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| offset | integer | Position in pagination. | No |
| limit | integer | Number of items to retrieve (100 max). | No |
| count | integer | Total number of items available. | No |
| history | [ [Activity](#activity) ] |  | No |

#### Error

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| code | integer |  | No |
| message | string |  | No |
| fields | string |  | No |
