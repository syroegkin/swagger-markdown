Instagram API
=============
The first version of the Instagram API is an exciting step forward towards
making it easier for users to have open access to their data. We created it
so that you can surface the amazing content Instagram users share every
second, in fun and innovative ways.

Build something great!

Once you've
[registered your client](http://instagram.com/developer/register/) it's easy
to start requesting data from Instagram.

All endpoints are only accessible via https and are located at
`api.instagram.com`. For instance: you can grab the most popular photos at
the moment by accessing the following URL with your client ID
(replace CLIENT-ID with your own):
```
  https://api.instagram.com/v1/media/popular?client_id=CLIENT-ID
```
You're best off using an access_token for the authenticated user for each
endpoint, though many endpoints don't require it.
In some cases an access_token will give you more access to information, and
in all cases, it means that you are operating under a per-access_token limit
vs. the same limit for your single client_id.


## Limits
Be nice. If you're sending too many requests too quickly, we'll send back a
`503` error code (server unavailable).
You are limited to 5000 requests per hour per `access_token` or `client_id`
overall. Practically, this means you should (when possible) authenticate
users so that limits are well outside the reach of a given user.

## Deleting Objects
We do our best to have all our URLs be
[RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer).
Every endpoint (URL) may support one of four different http verbs. GET
requests fetch information about an object, POST requests create objects,
PUT requests update objects, and finally DELETE requests will delete
objects.

Since many old browsers don't support PUT or DELETE, we've made it easy to
fake PUTs and DELETEs. All you have to do is do a POST with _method=PUT or
_method=DELETE as a parameter and we will treat it as if you used PUT or
DELETE respectively.

## Structure

### The Envelope
Every response is contained by an envelope. That is, each response has a
predictable set of keys with which you can expect to interact:
```json
{
    "meta": {
        "code": 200
    },
    "data": {
        ...
    },
    "pagination": {
        "next_url": "...",
        "next_max_id": "13872296"
    }
}
```

#### META
The meta key is used to communicate extra information about the response to
the developer. If all goes well, you'll only ever see a code key with value
200. However, sometimes things go wrong, and in that case you might see a
response like:
```json
{
    "meta": {
        "error_type": "OAuthException",
        "code": 400,
        "error_message": "..."
    }
}
```

#### DATA
The data key is the meat of the response. It may be a list or dictionary,
but either way this is where you'll find the data you requested.
#### PAGINATION
Sometimes you just can't get enough. For this reason, we've provided a
convenient way to access more data in any request for sequential data.
Simply call the url in the next_url parameter and we'll respond with the
next set of data.
```json
{
    ...
    "pagination": {
        "next_url": "https://api.instagram.com/v1/tags/puppy/media/recent?access_token=fb2e77d.47a0479900504cb3ab4a1f626d174d2d&max_id=13872296",
        "next_max_id": "13872296"
    }
}
```
On views where pagination is present, we also support the "count" parameter.
Simply set this to the number of items you'd like to receive. Note that the
default values should be fine for most applications - but if you decide to
increase this number there is a maximum value defined on each endpoint.

### JSONP
If you're writing an AJAX application, and you'd like to wrap our response
with a callback, all you have to do is specify a callback parameter with
any API call:
```
https://api.instagram.com/v1/tags/coffee/media/recent?access_token=fb2e77d.47a0479900504cb3ab4a1f626d174d2d&callback=callbackFunction
```
Would respond with:
```js
callbackFunction({
    ...
});
```


**Version:** v1

**Terms of service:**  
http://instagram.com/about/legal/terms/api

### Security
---
**oauth**  

|oauth2|*OAuth 2.0*|
|---|---|
|Flow|implicit|
|Authorization URL|https://instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token|
|**Scopes**||
|basic|to read any and all data related to a user (e.g. following/followed-by  lists, photos, etc.) (granted by default) |
|comments|to create or delete comments on a user’s behalf|
|relationships|to follow and unfollow users on a user’s behalf|
|likes|to like and unlike items on a user’s behalf|

**key**  

|apiKey|*API Key*|
|---|---|
|In|query|
|Name|access_token|

### /users/{user-id}
---
##### ***GET***
**Description:** Get basic information about a user.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user-id | path | The user identifier number | Yes | number |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | The user object | object |

**Security**

| Security Schema | Scopes |
| --- | --- |
| key | |
| oauth | basic |

### /users/self/feed
---
##### ***GET***
**Description:** See the authenticated user's feed.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| count | query | Count of media to return. | No | integer |
| max_id | query | Return media earlier than this max_id.s | No | integer |
| min_id | query | Return media later than this min_id. | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

### /users/{user-id}/media/recent
---
##### ***GET***
**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user-id | path | The user identifier number | Yes | number |
| count | query | Count of media to return. | No | integer |
| max_timestamp | query | Return media before this UNIX timestamp. | No | integer |
| min_timestamp | query | Return media after this UNIX timestamp. | No | integer |
| min_id | query | Return media later than this min_id. | No | string |
| max_id | query | Return media earlier than this max_id. | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Get the most recent media published by a user. To get the most recent media published by the owner of the access token, you can use `self` instead of the `user-id`.  | object |

### /users/self/media/liked
---
##### ***GET***
**Description:** See the list of media liked by the authenticated user.
Private media is returned as long as the authenticated user
has permissionto view that media. Liked media lists are only
available for the currently authenticated user.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| count | query | Count of media to return. | No | integer |
| max_like_id | query | Return media liked before this id. | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

### /users/search
---
##### ***GET***
**Description:** Search for a user by name.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| q | query | A query string | Yes | string |
| count | query | Number of users to return. | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

### /users/{user-id}/follows
---
##### ***GET***
**Description:** Get the list of users this user follows.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user-id | path | The user identifier number | Yes | number |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK |  |

### /users/{user-id}/followed-by
---
##### ***GET***
**Description:** Get the list of users this user is followed by.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user-id | path | The user identifier number | Yes | number |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK |  |

### /users/self/requested-by
---
##### ***GET***
**Description:** List the users who have requested this user's permission to follow.


**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK |  |

### /users/{user-id}/relationship
---
##### ***POST***
**Description:** Modify the relationship between the current user and thetarget user.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user-id | path | The user identifier number | Yes | number |
| action | body | One of follow/unfollow/block/unblock/approve/ignore. | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK |  |

**Security**

| Security Schema | Scopes |
| --- | --- |
| oauth | relationships |

### /media/{media-id}
---
##### ***GET***
**Description:** Get information about a media object.
The returned type key will allow you to differentiate between `image`
and `video` media.

Note: if you authenticate with an OAuth Token, you will receive the
`user_has_liked` key which quickly tells you whether the current user
has liked this media item.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| media-id | path | The media ID | Yes | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [Media](#media) |

### /media1/{shortcode}
---
##### ***GET***
**Description:** This endpoint returns the same response as **GET** `/media/media-id`.

A media object's shortcode can be found in its shortlink URL.
An example shortlink is `http://instagram.com/p/D/`
Its corresponding shortcode is D.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| shortcode | path | The media shortcode | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [Media](#media) |

### /media/search
---
##### ***GET***
**Description:** Search for media in a given area. The default time span is set to 5
days. The time span must not exceed 7 days. Defaults time stamps cover
the last 5 days. Can return mix of image and video types.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| LAT | query | Latitude of the center search coordinate. If used, lng is required.  | No | number |
| MIN_TIMESTAMP | query | A unix timestamp. All media returned will be taken later than this timestamp.  | No | integer |
| LNG | query | Longitude of the center search coordinate. If used, lat is required.  | No | number |
| MAX_TIMESTAMP | query | A unix timestamp. All media returned will be taken earlier than this timestamp.  | No | integer |
| DISTANCE | query | Default is 1km (distance=1000), max distance is 5km. | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

### /media/popular
---
##### ***GET***
**Description:** Get a list of what media is most popular at the moment.
Can return mix of image and video types.


**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

### /media/{media-id}/comments
---
##### ***GET***
**Description:** Get a list of recent comments on a media object.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| media-id | path | Media ID | Yes | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK |  |

##### ***POST***
**Description:** Create a comment on a media object with the following rules:

* The total length of the comment cannot exceed 300 characters.
* The comment cannot contain more than 4 hashtags.
* The comment cannot contain more than 1 URL.
* The comment cannot consist of all capital letters.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| media-id | path | Media ID | Yes | integer |
| TEXT | body | Text to post as a comment on the media object as specified in media-id.  | No | number |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

**Security**

| Security Schema | Scopes |
| --- | --- |
| oauth | comments |

##### ***DELETE***
**Description:** Remove a comment either on the authenticated user's media object or
authored by the authenticated user.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| media-id | path | Media ID | Yes | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

### /media/{media-id}/likes
---
##### ***GET***
**Description:** Get a list of users who have liked this media.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| media-id | path | Media ID | Yes | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK |  |

##### ***POST***
**Description:** Set a like on this media by the currently authenticated user.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| media-id | path | Media ID | Yes | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

**Security**

| Security Schema | Scopes |
| --- | --- |
| oauth | comments |

##### ***DELETE***
**Description:** Remove a like on this media by the currently authenticated user.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| media-id | path | Media ID | Yes | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

### /tags/{tag-name}
---
##### ***GET***
**Description:** Get information about a tag object.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tag-name | path | Tag name | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [Tag](#tag) |

### /tags/{tag-name}/media/recent
---
##### ***GET***
**Description:** Get a list of recently tagged media. Use the `max_tag_id` and
`min_tag_id` parameters in the pagination response to paginate through
these objects.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tag-name | path | Tag name | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK |  |

### /tags/search
---
##### ***GET***
**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| q | query | A valid tag name without a leading #. (eg. snowy, nofilter)  | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

### /locations/{location-id}
---
##### ***GET***
**Description:** Get information about a location.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| location-id | path | Location ID | Yes | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

### /locations/{location-id}/media/recent
---
##### ***GET***
**Description:** Get a list of recent media objects from a given location.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| location-id | path | Location ID | Yes | integer |
| max_timestamp | query | Return media before this UNIX timestamp. | No | integer |
| min_timestamp | query | Return media after this UNIX timestamp. | No | integer |
| min_id | query | Return media later than this min_id. | No | string |
| max_id | query | Return media earlier than this max_id. | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

### /locations/search
---
##### ***GET***
**Description:** Search for a location by geographic coordinate.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| distance | query | Default is 1000m (distance=1000), max distance is 5000. | No | integer |
| facebook_places_id | query | Returns a location mapped off of a Facebook places id. If used, a Foursquare id and lat, lng are not required.  | No | integer |
| foursquare_id | query | returns a location mapped off of a foursquare v1 api location id. If used, you are not required to use lat and lng. Note that this method is deprecated; you should use the new foursquare IDs with V2 of their API.  | No | integer |
| lat | query | atitude of the center search coordinate. If used, lng is required.  | No | number |
| lng | query | ongitude of the center search coordinate. If used, lat is required.  | No | number |
| foursquare_v2_id | query | Returns a location mapped off of a foursquare v2 api location id. If used, you are not required to use lat and lng.  | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |

### /geographies/{geo-id}/media/recent
---
##### ***GET***
**Description:** Get recent media from a geography subscription that you created.
**Note**: You can only access Geographies that were explicitly created
by your OAuth client. Check the Geography Subscriptions section of the
[real-time updates page](https://instagram.com/developer/realtime/).
When you create a subscription to some geography
that you define, you will be returned a unique geo-id that can be used
in this query. To backfill photos from the location covered by this
geography, use the [media search endpoint
](https://instagram.com/developer/endpoints/media/).


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| geo-id | path | Geolocation ID | Yes | integer |
| count | query | Max number of media to return. | No | integer |
| min_id | query | Return media before this `min_id`. | No | integer |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### Models
---
<a name="user"></a>**User**  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| username | string |  | No |
| full_name | string |  | No |
| profile_picture | string |  | No |
| bio | string |  | No |
| website | string |  | No |
| counts | object |  | No |
<a name="media"></a>**Media**  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| created_time | integer | Epoc time (ms) | No |
| type | string |  | No |
| filter | string |  | No |
| tags | [ [Tag](#tag) ] |  | No |
| id | integer |  | No |
| user | [MiniProfile](#miniProfile) |  | No |
| users_in_photo | [ [MiniProfile](#miniProfile) ] |  | No |
| location | [Location](#location) |  | No |
| comments: | object |  | No |
| likes | object |  | No |
| images |  |  | No |
| videos |  |  | No |
<a name="location"></a>**Location**  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string |  | No |
| name | string |  | No |
| latitude | number |  | No |
| longitude | number |  | No |
<a name="comment"></a>**Comment**  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string |  | No |
| created_time | string |  | No |
| text | string |  | No |
| from | [MiniProfile](#miniProfile) |  | No |
<a name="like"></a>**Like**  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| user_name | string |  | No |
| first_name | string |  | No |
| last_name | string |  | No |
| type | string |  | No |
| id | string |  | No |
<a name="tag"></a>**Tag**  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| media_count | integer |  | No |
| name | string |  | No |
<a name="image"></a>**Image**  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| width | integer |  | No |
| height | integer |  | No |
| url | string |  | No |
<a name="miniProfile"></a>**MiniProfile**  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| user_name | string |  | No |
| full_name | string |  | No |
| id | integer |  | No |
| profile_picture | string |  | No |