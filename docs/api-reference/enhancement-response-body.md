---
title: Enhancement Response Body
description: Full field reference for the Adstract ad enhancement response structure.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The ad enhancement response has the same body shape across successful
enhancement outcomes. Always check both `success` and `status`.

## Structure

```json
{
  "ad_request_id": "string",
  "ad_response_id": "string",
  "status": "string",
  "success": "boolean",
  "execution_time_ms": "number",
  "enhanced_prompt": "string | null",
  "product_name": "string | null"
}
```

## `ad_request_id`

- Type: `string`
- Description: Unique identifier for the enhancement request.

## `ad_response_id`

- Type: `string`
- Description: Unique identifier for the enhancement result. This value is
  required for acknowledgment.

## `status`

- Type: `string`
- Description: Outcome label returned by the API. Expected values are `ok`,
  `rejected`, and `no_fill`.

## `success`

- Type: `boolean`
- Description: `true` only when an ad was successfully injected.

## `execution_time_ms`

- Type: `number`
- Description: Server-side processing time in milliseconds.

## `enhanced_prompt`

- Type: `string | null`
- Description: The prompt to send to your LLM. This is `null` when no ad was
  injected.

## `product_name`

- Type: `string | null`
- Description: Name of the product associated with the injected ad flow. This
  is `null` when no ad was injected.

## Response values by HTTP code

| HTTP code | `status` | `success` | `enhanced_prompt` | `product_name` |
|---|---|---|---|---|
| `200 OK` | `"ok"` | `true` | populated | populated |
| `201 Created` | `"rejected"` | `false` | `null` | `null` |
| `202 Accepted` | `"no_fill"` | `false` | `null` | `null` |

See [Enhancement Status Codes](/api-reference/enhancement-status-codes) for the
full meaning of each response code.

## Handling all cases

<Tabs groupId="api-language">
<TabItem value="js" label="JavaScript" default>

```js
const originalPrompt = "What are some good ways to advertise with AI?";

const response = await fetch("https://api.adstract.ai/api/ad-injection/start/", {
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
    "https://api.adstract.ai/api/ad-injection/start/",
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
  https://api.adstract.ai/api/ad-injection/start/ \
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

- [Acknowledgment Request Body](/api-reference/acknowledgment-request-body)
- [Enhancement Status Codes](/api-reference/enhancement-status-codes)
- [Ad Injection](/api-reference/ad-injection)
