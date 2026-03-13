---
title: Authentication
description: How to authenticate requests to the Adstract API using the X-Adstract-API-Key header.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

All requests to the Adstract API must include a valid API key. The key is
passed as a request header — there is no cookie-based or OAuth-based
authentication flow.

## Header

```
X-Adstract-API-Key: your-api-key
```

Include this header on every request:

<Tabs groupId="api-language">
<TabItem value="js" label="JavaScript" default>

```js
const response = await fetch("https://api.adstract.ai/ad-injection/start/", {
  method: "POST",
  headers: {
    "X-Adstract-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ ... }),
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
    json={ ... },
)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl https://api.adstract.ai/ad-injection/start/ \
  -H "X-Adstract-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

</TabItem>
</Tabs>

## Key types

Adstract issues two types of API key, each for a different stage of your
integration lifecycle.

| Key type | When to use | Traffic paid |
|---|---|---|
| **Sandbox** | During development and verification | No |
| **Billing** | After verification is approved | Yes |

You must complete the [publisher verification](/verification) process before a
Billing key becomes available.

## Getting a Sandbox key

1. Sign up as a Publisher at [adstract.ai](https://adstract.ai).
2. Create a platform and ensure it is active.
3. Navigate to **API Keys** and create a **Sandbox** key.

See [Sandbox Key](/sandbox-key) for the full walkthrough.

## Getting a Billing key

After your account is verified:

1. Navigate to **API Keys**.
2. Create a **Billing** key.
3. Replace the `X-Adstract-API-Key` value in your requests.

See [Billing Key](/billing-key) for the full walkthrough.

## `401 Unauthorized`

A `401` response means the key is missing, malformed, or revoked:

```json
{
  "detail": "Authentication credentials were not provided."
}
```

Always verify that the header name is exactly `X-Adstract-API-Key` and the
value is the full key string with no extra whitespace.

## Next steps

- [Sandbox Key](/sandbox-key) — create your first API key.
- [Ad Injection](/api-reference/ad-injection) — start making requests.
