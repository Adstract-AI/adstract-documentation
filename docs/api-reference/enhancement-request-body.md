---
title: Enhancement Request Body
description: Full field reference for the Adstract ad enhancement request payload.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The ad enhancement request body must be JSON. The only required top-level
fields are `prompt` and `request_context`.

## Top-level structure

```json
{
  "prompt": "string",
  "request_context": { ... },
  "request_configuration": { ... },
  "optional_context": { ... }
}
```

## `prompt`

- Type: `string`
- Required: yes
- Description: The original user prompt that Adstract evaluates for ad
  enhancement.

## `request_context`

- Required: yes
- Description: Runtime context from the originating user request.

| Field | Type | Required | Description |
|---|---|---|---|
| `session_id` | string | yes | Identifies the request session or conversation context. |
| `user_agent` | string | yes | User-Agent string from the end-user client. |
| `user_ip` | string | yes | IP address of the end-user client. |

## `request_configuration`

- Required: no
- Description: Controls how ad instructions are wrapped in the enhanced prompt.

| Field | Type | Required | Description |
|---|---|---|---|
| `wrapping_type` | string | no | Accepted values: `"xml"`, `"plain"`, `"markdown"`. |

## `optional_context`

- Required: no
- Description: Additional targeting context. Every field in this object is optional.

| Field | Type | Description |
|---|---|---|
| `country` | string | ISO 3166-1 alpha-2 country code such as `"US"`. |
| `region` | string | Region or state name. |
| `city` | string | City name. |
| `asn` | integer | Autonomous System Number. |
| `age` | integer | User age, between 0 and 120. |
| `gender` | string | Accepted values: `"male"`, `"female"`, `"other"`. |

## Full example

<Tabs groupId="api-language">
<TabItem value="js" label="JavaScript" default>

```js
const response = await fetch("https://api.adstract.ai/api/ad-injection/start/", {
  method: "POST",
  headers: {
    "X-Adstract-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: "What are some good ways to advertise with AI?",
    request_context: {
      session_id: "session_001",
      user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
      user_ip: "203.0.113.24",
    },
    request_configuration: {
      wrapping_type: "xml",
    },
    optional_context: {
      country: "US",
      region: "California",
      city: "San Francisco",
      asn: 15169,
      age: 21,
      gender: "female",
    },
  }),
});
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
    "https://api.adstract.ai/api/ad-injection/start/",
    headers={
        "X-Adstract-API-Key": "your-api-key",
        "Content-Type": "application/json",
    },
    json={
        "prompt": "What are some good ways to advertise with AI?",
        "request_context": {
            "session_id": "session_001",
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
            "user_ip": "203.0.113.24",
        },
        "request_configuration": {
            "wrapping_type": "xml",
        },
        "optional_context": {
            "country": "US",
            "region": "California",
            "city": "San Francisco",
            "asn": 15169,
            "age": 21,
            "gender": "female",
        },
    },
)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl https://api.adstract.ai/api/ad-injection/start/ \
  -H "X-Adstract-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "What are some good ways to advertise with AI?",
    "request_context": {
      "session_id": "session_001",
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
      "user_ip": "203.0.113.24"
    },
    "request_configuration": {
      "wrapping_type": "xml"
    },
    "optional_context": {
      "country": "US",
      "region": "California",
      "city": "San Francisco",
      "asn": 15169,
      "age": 21,
      "gender": "female"
    }
  }'
```

</TabItem>
</Tabs>

## Next steps

- [Enhancement Response Body](/api-reference/enhancement-response-body)
- [Ad Injection](/api-reference/ad-injection)
