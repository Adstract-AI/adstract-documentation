---
title: Ad Acknowledgment
description: Reference for the Adstract Ad Acknowledgment endpoint — closing the ad cycle after your LLM responds.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The acknowledgment endpoint closes the ad cycle after your LLM has produced its
final response. It must be called after every successful `200` response from the
[Ad Injection](/api-reference/ad-injection) endpoint. Skipping it breaks the
reporting cycle and affects publisher payout.

## Endpoint

```
POST https://api.adstract.ai/api/ad-injection/acknowledge/
```

## Authentication

All requests must include your API key in the `X-Adstract-API-Key` header.
See [Authentication](/api-reference/api-authentication) for full details.

## Request body

| Field | Type | Required | Description |
|---|---|---|---|
| `ad_response_id` | string (UUID) | yes | The `ad_response_id` from the `200` response of the Ad Injection endpoint. |
| `llm_response` | string | yes | The complete final response text produced by your LLM. |

```json
{
  "ad_response_id": "55c59ce2-a31f-4ce4-95b3-f930fd9cd564",
  "llm_response": "Here is the full response text your LLM produced..."
}
```

## Example

<Tabs groupId="api-language">
<TabItem value="js" label="JavaScript" default>

```js
await fetch("https://api.adstract.ai/api/ad-injection/acknowledge/", {
  method: "POST",
  headers: {
    "X-Adstract-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ad_response_id: "55c59ce2-a31f-4ce4-95b3-f930fd9cd564",
    llm_response: llmResponse,
  }),
});
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

httpx.post(
    "https://api.adstract.ai/api/ad-injection/acknowledge/",
    headers={
        "X-Adstract-API-Key": "your-api-key",
        "Content-Type": "application/json",
    },
    json={
        "ad_response_id": "55c59ce2-a31f-4ce4-95b3-f930fd9cd564",
        "llm_response": llm_response,
    },
)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl https://api.adstract.ai/api/ad-injection/acknowledge/ \
  -H "X-Adstract-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "ad_response_id": "55c59ce2-a31f-4ce4-95b3-f930fd9cd564",
    "llm_response": "Here is the full response text your LLM produced..."
  }'
```

</TabItem>
</Tabs>

## Response codes

See [Status Codes — Ad Acknowledgment](/api-reference/status-codes#ad-acknowledgment) for a full breakdown of every code returned by this endpoint.

## When to call this endpoint

Only call the acknowledgment endpoint when the Ad Injection endpoint returned
`200`. Responses with status `201` (rejected) or `202` (no fill) must not be
acknowledged — attempting to do so will return `400`.

```js
const injectionResponse = await fetch("https://api.adstract.ai/ad-injection/start/", {
  method: "POST",
  headers: { "X-Adstract-API-Key": "your-api-key", "Content-Type": "application/json" },
  body: JSON.stringify({ prompt, request_context }),
});

let promptToUse;
let adResponseId = null;

if (injectionResponse.status === 200) {
  const data = await injectionResponse.json();
  promptToUse = data.enhanced_prompt;
  adResponseId = data.ad_response_id;
} else {
  promptToUse = prompt;
}

const llmResponse = await yourLLM(promptToUse);

if (adResponseId) {
  await fetch("https://api.adstract.ai/api/ad-injection/acknowledge/", {
    method: "POST",
    headers: { "X-Adstract-API-Key": "your-api-key", "Content-Type": "application/json" },
    body: JSON.stringify({ ad_response_id: adResponseId, llm_response: llmResponse }),
  });
}
```

## Related pages

- [Ad Injection](/api-reference/ad-injection) — the injection endpoint that precedes acknowledgment.
- [Status Codes](/api-reference/status-codes) — full breakdown of all HTTP status codes.
- [Authentication](/api-reference/api-authentication) — API key setup and the `X-Adstract-API-Key` header.
