---
title: Request Body
description: Full field reference for the Adstract Ad Injection request payload.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The request body must be JSON. All top-level fields except `prompt` and
`request_context` are optional.

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

- **Type:** `string`
- **Required:** yes
- **Description:** The original user prompt. Adstract attempts to enhance this
  with ad instructions before you send it to your LLM.

## `request_context`

- **Required:** yes
- **Description:** Runtime context about the originating request. All three
  fields are required.

| Field | Type | Required | Description |
|---|---|---|---|
| `session_id` | string | yes | Identifies the session or conversation. Used for tracking context. |
| `user_agent` | string | yes | The User-Agent string of the end-user client. |
| `user_ip` | string | yes | The IP address of the end-user client. |

## `request_configuration`

- **Required:** no
- **Description:** Controls how the ad instructions are embedded into the enhanced prompt.

| Field | Type | Required | Description |
|---|---|---|---|
| `wrapping_type` | string | no | Format used to wrap the injected ad content. Accepted values: `"xml"`, `"plain"`, `"markdown"`. |

## `optional_context`

- **Required:** no
- **Description:** Additional targeting context to improve ad relevance. All
  fields are optional — provide as many as available.

| Field | Type | Description |
|---|---|---|
| `country` | string | ISO 3166-1 alpha-2 country code (e.g. `"US"`, `"DE"`). |
| `region` | string | Region or state name (e.g. `"California"`). |
| `city` | string | City name (e.g. `"San Francisco"`). |
| `asn` | integer | Autonomous System Number for network identification. |
| `age` | integer | User age. Must be between 0 and 120. |
| `gender` | string | User gender. Accepted values: `"male"`, `"female"`, `"other"`. |

## Full example

<Tabs groupId="api-language">
<TabItem value="js" label="JavaScript" default>

```js
const response = await fetch("https://api.adstract.ai/ad-injection/start/", {
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
    "https://api.adstract.ai/ad-injection/start/",
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
curl https://api.adstract.ai/ad-injection/start/ \
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

- [Response Body](/api-reference/api-response) — full field reference for the response payload.
- [Ad Injection](/api-reference/ad-injection) — endpoint overview and integration flow.
