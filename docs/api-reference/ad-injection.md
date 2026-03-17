---
title: Ad Injection
description: Complete reference for the Adstract Ad Injection endpoint — request, response, and status codes.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Ad Injection endpoint is the core of the Adstract API. It accepts a user
prompt and request context, then returns an enhanced prompt with ad instructions
embedded. This is the direct HTTP equivalent of the SDK's `request_ad` method.

## Endpoint

```
POST https://api.adstract.ai/api/ad-injection/start/
```

## Authentication

All requests must include your API key in the `X-Adstract-API-Key` header.
See [Authentication](/api-reference/api-authentication) for full details.

## Minimal request

The minimum viable request includes `prompt` and `request_context`:

For the complete payload shape, including `request_configuration` and
`optional_context`, see [Enhancement Request Body](/api-reference/enhancement-request-body).

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
    }
  }'
```

</TabItem>
</Tabs>

## Full request

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

## Response

The response body has the same shape for all successful status codes. Check `success` to
determine whether `enhanced_prompt` is populated.

```json
{
  "ad_request_id": "55c59ce2-a31f-4ce4-95b3-f930fd9cd564",
  "ad_response_id": "55c59ce2-a31f-4ce4-95b3-f930fd9cd564",
  "status": "ok",
  "success": true,
  "execution_time_ms": 1987.964153289795,
  "enhanced_prompt": "You are an AI assistant that integrates advertisements...",
  "product_name": "Adstract – LLM Advertising"
}
```

`enhanced_prompt` and `product_name` are `null` when `success` is `false`.
See [Enhancement Response Body](/api-reference/enhancement-response-body) for
the full field reference.

See [Enhancement Status Codes](/api-reference/enhancement-status-codes) for a
full breakdown of every code.

## Integration flow

1. Send the user's prompt to this endpoint.
2. Check the HTTP status code.
3. On `200`: pass `enhanced_prompt` to your LLM.
4. On `201` or `202`: pass the original prompt to your LLM unchanged.
5. After your LLM responds, call the acknowledgment endpoint to close the ad cycle.

## Next steps

- [Enhancement Request Body](/api-reference/enhancement-request-body) — full field reference for the request payload.
- [Enhancement Response Body](/api-reference/enhancement-response-body) — full field reference for the response payload.
- [Ad Acknowledgment](/api-reference/ad-acknowledgment) — closing the ad cycle after your LLM responds.
- [Enhancement Status Codes](/api-reference/enhancement-status-codes) — detailed breakdown of every HTTP status code returned by this endpoint.
- [Authentication](/api-reference/api-authentication) — API key setup and header details.
