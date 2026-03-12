---
title: Quickstart
description: Detailed setup and first integration flow for the Adstract SDK.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide walks through a complete first integration:

- install the SDK;
- configure credentials;
- request ad-enhanced prompt content;
- send that prompt to your model; and
- acknowledge the final model response.

## 1. Install the SDK

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```bash
python -m pip install adstractai
```

</TabItem>
</Tabs>

## 2. Configure credentials

Set your API key in the environment:

```bash
export ADSTRACT_API_KEY="your-api-key"
```

You can also pass `api_key` directly when creating the client.

## 3. Create your first enhancement request

The example below demonstrates a production-style flow with explicit
configuration, enhancement request, LLM call, and acknowledgment.

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

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

if not result.success:
    print(f"Enhancement failed: {result.error}")

prompt_for_model = result.prompt
print(prompt_for_model)

llm_result = llm_client.responses.create(
    model="gpt-4.1-mini",
    input=prompt_for_model,
)
llm_response = llm_result.output_text

client.acknowledge(
    enhancement_result=result,
    llm_response=llm_response,
)

client.close()
```

</TabItem>
</Tabs>

## 4. Required request fields

Each request must include:

- `session_id`
- `user_agent`
- `user_ip`

If required values are missing or empty, the SDK raises validation exceptions.

## 5. Optional targeting context

You can pass an `OptionalContext` for improved ad relevance:

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

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
</Tabs>

## 6. Async integration example

Use async methods in async application servers or worker pipelines:

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
import asyncio
from adstractai import Adstract
from adstractai.models import AdRequestContext
from openai import AsyncOpenAI


async def main() -> None:
    client = Adstract()
    llm_client = AsyncOpenAI()

    result = await client.request_ad_async(
        prompt="Give me productivity tips",
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

    if not result.success:
        print(f"Enhancement failed: {result.error}")

    llm_result = await llm_client.responses.create(
        model="gpt-4.1-mini",
        input=result.prompt,
    )
    llm_response = llm_result.output_text

    await client.acknowledge_async(enhancement_result=result, llm_response=llm_response)
    await client.aclose()


asyncio.run(main())
```

</TabItem>
</Tabs>

## 7. Method usage guidance

- `request_ad` and `request_ad_async` are the enhancement entrypoints.
  By default they raise on failure; pass `raise_exception=False` to always
  return an `EnhancementResult`.
- `acknowledge` and `acknowledge_async` are the acknowledgment entrypoints.
  Call them after you receive the final LLM output.
- Validate `session_id`, `user_agent`, and `user_ip` before sending requests.
- Always close SDK and LLM clients in long-running services.

## 8. Where to go next

- [Pricing](/pricing) for current service pricing.
