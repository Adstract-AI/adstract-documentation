---
title: Quickstart
description: Detailed first integration flow for the Adstract SDK and REST API.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide walks through a complete first integration with Adstract.

You can integrate in two ways:

- use the Python SDK; or
- use the REST API, shown here with JavaScript examples.

Both flows follow the same runtime pattern:

- send the original prompt to Adstract;
- receive an enhanced prompt or a fallback outcome;
- send the final prompt to your LLM; and
- acknowledge the final model response.

## 1. Prepare your integration

<Tabs groupId="quickstart-path">
<TabItem value="python-sdk" label="Python - SDK" default>

```bash
python -m pip install adstractai
```

</TabItem>
<TabItem value="javascript-rest" label="JavaScript - REST API">

```bash
node --version
```

</TabItem>
</Tabs>

## 2. Configure credentials

Adstract requires an API key in both integration paths.

<Tabs groupId="quickstart-path">
<TabItem value="python-sdk" label="Python - SDK" default>

```bash
export ADSTRACT_API_KEY="your-api-key"
```

</TabItem>
<TabItem value="javascript-rest" label="JavaScript - REST API">

```javascript
const API_KEY = "your-api-key";
```

</TabItem>
</Tabs>

## 3. Run your first full flow

The examples below show the full runtime flow: enhancement request, LLM call,
and acknowledgment.

<Tabs groupId="quickstart-path">
<TabItem value="python-sdk" label="Python - SDK" default>

```python
from adstractai import Adstract
from adstractai.models import AdRequestContext
from openai import OpenAI

client = Adstract()
llm_client = OpenAI()

result = client.request_ad(
    prompt="How do I improve analytics in my LLM app?",
    context=AdRequestContext(
        session_id="session-abc",
        user_agent=(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        ),
        user_ip="203.0.113.10",
    ),
    raise_exception=False,
)

llm_result = llm_client.responses.create(
    model="gpt-4.1-mini",
    input=result.prompt,
)
llm_response = llm_result.output_text

ack = client.acknowledge(
    enhancement_result=result,
    llm_response=llm_response,
)

if ack is not None:
    print(ack.ad_ack_id)
    print(ack.status)

client.close()
```

</TabItem>
<TabItem value="javascript-rest" label="JavaScript - REST API">

```javascript
const API_KEY = "your-api-key";
const prompt = "How do I improve analytics in my LLM app?";

const requestContext = {
  session_id: "session-abc",
  user_agent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  user_ip: "203.0.113.10",
};

const enhancementResponse = await fetch("https://api.adstract.ai/api/ad-injection/start/", {
  method: "POST",
  headers: {
    "X-Adstract-API-Key": API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt,
    request_context: requestContext,
  }),
});

let promptForModel = prompt;
let adResponseId = null;

if (enhancementResponse.status === 200) {
  const enhancement = await enhancementResponse.json();
  promptForModel = enhancement.enhanced_prompt;
  adResponseId = enhancement.ad_response_id;
} else if (enhancementResponse.status !== 201 && enhancementResponse.status !== 202) {
  throw new Error(`Adstract enhancement failed with status ${enhancementResponse.status}`);
}

const llmResponse = await yourLLM(promptForModel);

if (adResponseId !== null) {
  const acknowledgmentResponse = await fetch("https://api.adstract.ai/api/ad-injection/acknowledge/", {
    method: "POST",
    headers: {
      "X-Adstract-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ad_response_id: adResponseId,
      llm_response: llmResponse,
    }),
  });

  if (acknowledgmentResponse.status !== 200 && acknowledgmentResponse.status !== 201) {
    throw new Error(`Adstract acknowledgment failed with status ${acknowledgmentResponse.status}`);
  }

  const ack = await acknowledgmentResponse.json();
  console.log(ack.ad_ack_id);
  console.log(ack.status);
}
```

</TabItem>
</Tabs>

## 4. Required request fields

Every enhancement request must include:

- `session_id`
- `user_agent`
- `user_ip`

These fields identify the request context and are required in both the SDK flow
and the REST API flow.

## 5. Optional targeting context

You can pass optional targeting context to improve ad relevance.

<Tabs groupId="quickstart-path">
<TabItem value="python-sdk" label="Python - SDK" default>

```python
from adstractai.models import OptionalContext

result = client.request_ad(
    prompt="How do I improve analytics in my LLM app?",
    context=AdRequestContext(
        session_id="session-abc",
        user_agent="Mozilla/5.0 (X11; Linux x86_64)",
        user_ip="203.0.113.10",
    ),
    optional_context=OptionalContext(
        country="US",
        region="California",
        city="San Francisco",
        age=30,
        gender="male",
    ),
)
```

</TabItem>
<TabItem value="javascript-rest" label="JavaScript - REST API">

```javascript
const enhancementResponse = await fetch("https://api.adstract.ai/api/ad-injection/start/", {
  method: "POST",
  headers: {
    "X-Adstract-API-Key": API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt,
    request_context: requestContext,
    optional_context: {
      country: "US",
      region: "California",
      city: "San Francisco",
      age: 30,
      gender: "male",
    },
  }),
});
```

</TabItem>
</Tabs>

## 6. How to read the result

<Tabs groupId="quickstart-path">
<TabItem value="python-sdk" label="Python - SDK" default>

The SDK returns structured models:

- `request_ad` returns `EnhancementResult`
- `acknowledge` returns `AdAckResponse` on success
- `acknowledge` returns `None` when enhancement did not succeed and acknowledgment is skipped

</TabItem>
<TabItem value="javascript-rest" label="JavaScript - REST API">

The REST API flow uses HTTP status codes plus JSON payloads:

- enhancement `200` means use `enhanced_prompt`
- enhancement `201` and `202` mean continue with the original prompt
- acknowledgment `200` and `201` return `ad_ack_id`, `status`, and `success`

</TabItem>
</Tabs>

## 7. Where to go next

- [Pricing](/pricing) for current service pricing.
