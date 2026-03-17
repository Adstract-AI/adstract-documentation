---
title: Acknowledgment Response Body
description: Full field reference for the Adstract acknowledgment response structure.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The acknowledgment response returns the identifier of the created
acknowledgment record together with the normalized acknowledgment status and
success flag.

## Structure

```json
{
  "ad_ack_id": "string",
  "status": "string",
  "success": "boolean"
}
```

## `ad_ack_id`

- Type: `string`
- Description: Unique identifier of the acknowledgment record created by
  Adstract.

## `status`

- Type: `string`
- Description: Normalized acknowledgment status returned by the backend.
- Allowed values:
  - `ok`
  - `no_ad_used`
  - `recoverable_error`

## `success`

- Type: `boolean`
- Description: Whether the acknowledgment completed successfully.
- Behavior:
  - `true` when `status` is `ok` or `no_ad_used`
  - `false` when `status` is `recoverable_error`

## Response values by HTTP code

| HTTP code | `status` | `success` | `ad_ack_id` |
|---|---|---|---|
| `200 OK` | `"ok"` or `"no_ad_used"` | `true` | populated |
| `201 Created` | `"recoverable_error"` | `false` | populated |

See [Acknowledgment Status Codes](/api-reference/acknowledgment-status-codes)
for the full meaning of each response code.

## Handling successful responses

<Tabs groupId="api-language">
<TabItem value="js" label="JavaScript" default>

```js
const response = await fetch("https://api.adstract.ai/api/ad-injection/acknowledge/", {
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

if (response.status === 200 || response.status === 201) {
  const data = await response.json();
  const ackId = data.ad_ack_id;
  const status = data.status;
  const success = data.success;
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
import httpx

response = httpx.post(
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

if response.status_code in {200, 201}:
    ack_id = response.json()["ad_ack_id"]
    status = response.json()["status"]
    success = response.json()["success"]
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

## Next steps

- [Acknowledgment Status Codes](/api-reference/acknowledgment-status-codes)
- [Ad Acknowledgment](/api-reference/ad-acknowledgment)
