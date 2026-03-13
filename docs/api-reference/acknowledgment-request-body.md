---
title: Acknowledgment Request Body
description: Full field reference for the Adstract acknowledgment request payload.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The acknowledgment request body is sent after a successful ad enhancement flow.
It must only be used for ad responses that came from a successful `200`
enhancement result.

## Structure

```json
{
  "ad_response_id": "string",
  "llm_response": "string"
}
```

## `ad_response_id`

- Type: `string`
- Required: yes
- Description: The `ad_response_id` returned by the successful enhancement
  response.

## `llm_response`

- Type: `string`
- Required: yes
- Description: The final response produced by your LLM after using the
  enhanced prompt.

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

## Next steps

- [Acknowledgment Response Body](/api-reference/acknowledgment-response-body)
- [Ad Acknowledgment](/api-reference/ad-acknowledgment)
