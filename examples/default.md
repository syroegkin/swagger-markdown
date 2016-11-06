Uber API
========
Move your app forward with the Uber API

**Version:** 1.0.0

### /products
---
##### ***GET***
**Summary:** Product Types

**Description:** The Products endpoint returns information about the *Uber* products
offered at a given location. The response includes the display name
and other details about each product, and lists the products in the
proper display order.


**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| latitude | query | Latitude component of location. | Yes | double |
| longitude | query | Longitude component of location. | Yes | double |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | An array of products |
| default | Unexpected error |

### /estimates/price
---
##### ***GET***
**Summary:** Price Estimates

**Description:** The Price Estimates endpoint returns an estimated price range
for each product offered at a given location. The price estimate is
provided as a formatted string with the full price range and the localized
currency symbol.<br><br>The response also includes low and high estimates,
and the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code for
situations requiring currency conversion. When surge is active for a particular
product, its surge_multiplier will be greater than 1, but the price estimate
already factors in this multiplier.


**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| start_latitude | query | Latitude component of start location. | Yes | double |
| start_longitude | query | Longitude component of start location. | Yes | double |
| end_latitude | query | Latitude component of end location. | Yes | double |
| end_longitude | query | Longitude component of end location. | Yes | double |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | An array of price estimates by product |
| default | Unexpected error |

### /estimates/time
---
##### ***GET***
**Summary:** Time Estimates

**Description:** The Time Estimates endpoint returns ETAs for all products offered at a given location, with the responses expressed as integers in seconds. We recommend that this endpoint be called every minute to provide the most accurate, up-to-date ETAs.

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| start_latitude | query | Latitude component of start location. | Yes | double |
| start_longitude | query | Longitude component of start location. | Yes | double |
| customer_uuid | query | Unique customer identifier to be used for experience customization. | No | string (uuid) |
| product_id | query | Unique identifier representing a specific product for a given latitude & longitude. | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | An array of products |
| default | Unexpected error |

### /me
---
##### ***GET***
**Summary:** User Profile

**Description:** The User Profile endpoint returns information about the Uber user that has authorized with the application.

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | Profile information for a user |
| default | Unexpected error |

### /history
---
##### ***GET***
**Summary:** User Activity

**Description:** The User Activity endpoint returns data about a user's lifetime activity with Uber. The response will include pickup locations and times, dropoff locations and times, the distance of past requests, and information about which products were requested.<br><br>The history array in the response will have a maximum length based on the limit parameter. The response value count may exceed limit, therefore subsequent API requests may be necessary.

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query | Offset the list of returned results by this amount. Default is zero. | No | integer |
| limit | query | Number of items to retrieve. Default is 5, maximum is 100. | No | integer |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | History information for the given user |
| default | Unexpected error |
