---
title: Response Body
description: Full field reference for the Adstract Ad Injection response payload and HTTP status codes.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The response body has the same shape for all status codes. Always check
`success` and `status` to determine how to proceed.

## Response body

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

| Field | Type | Description |
|---|---|---|
| `ad_request_id` | string (UUID) | Unique identifier for the ad request. Used in the acknowledgment step. |
| `ad_response_id` | string (UUID) | Unique identifier for the ad response. |
| `status` | string | `"ok"`, `"rejected"`, or `"no_fill"` depending on the outcome. |
| `success` | boolean | `true` only when `status` is `"ok"` and an ad was injected. |
| `execution_time_ms` | number | Server-side processing time in milliseconds. |
| `enhanced_prompt` | string \| null | The enhanced prompt to pass to your LLM. `null` when no ad was injected. |
| `product_name` | string \| null | Display name of the Adstract product that handled the request. `null` when no ad was injected. |

## `status` values by HTTP code

| HTTP code | `status` | `success` | `enhanced_prompt` | `product_name` |
|---|---|---|---|---|
| `200 OK` | `"ok"` | `true` | populated | populated |
| `201 Created` | `"rejected"` | `false` | `null` | `null` |
| `202 Accepted` | `"no_fill"` | `false` | `null` | `null` |

See [Enhancement Status Codes](/api-reference/enhancement-status-codes) for a
full breakdown of every code.

## Handling all cases

<Tabs groupId="api-language">
<TabItem value="js" label="JavaScript" default>

```js
const originalPrompt = "What are some good ways to advertise with AI?";

const response = await fetch("https://api.adstract.ai/ad-injection/start/", {
  method: "POST",
  headers: {
    "X-Adstract-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: originalPrompt,
    request_context: {
      session_id: "session_001",
      user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
      user_ip: "203.0.113.24",
    },
  }),
});

let prompt;
if (response.status === 200) {
  const data = await response.json();
  prompt = data.enhanced_prompt;
} else {
  prompt = originalPrompt;
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

original_prompt = "What are some good ways to advertise with AI?"

response = httpx.post(
    "https://api.adstract.ai/ad-injection/start/",
    headers={
        "X-Adstract-API-Key": "your-api-key",
        "Content-Type": "application/json",
    },
    json={
        "prompt": original_prompt,
        "request_context": {
            "session_id": "session_001",
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
            "user_ip": "203.0.113.24",
        },
    },
)

if response.status_code == 200:
    prompt = response.json()["enhanced_prompt"]
else:
    prompt = original_prompt
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
STATUS=$(curl -s -o /tmp/adstract_body.json -w "%{http_code}" \
  https://api.adstract.ai/ad-injection/start/ \
  -H "X-Adstract-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "What are some good ways to advertise with AI?",
    "request_context": {
      "session_id": "session_001",
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
      "user_ip": "203.0.113.24"
    }
  }')

if [ "$STATUS" = "200" ]; then
  PROMPT=$(python3 -c "import sys,json; print(json.load(open('/tmp/adstract_body.json'))['enhanced_prompt'])")
else
  PROMPT="What are some good ways to advertise with AI?"
fi
```

</TabItem>
</Tabs>

## Next steps

- [Enhancement Status Codes](/api-reference/enhancement-status-codes) — detailed breakdown of every HTTP status code returned by ad enhancement.
- [Ad Injection](/api-reference/ad-injection) — endpoint overview and integration flow.
- [Request Body](/api-reference/api-request) — full request payload reference.
