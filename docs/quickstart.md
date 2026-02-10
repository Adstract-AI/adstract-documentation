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
- report the final model response.

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
configuration, enhancement request, LLM call, and reporting.

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai import AdRequestConfiguration, Adstract
from openai import OpenAI

# Adstract client for prompt enhancement + reporting.
client = Adstract()
# LLM client.
llm_client = OpenAI()

result = client.request_ad_or_default(
    prompt="How do I improve analytics in my LLM app?",
    config=AdRequestConfiguration(
        session_id="session-abc",
        user_agent=(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        ),
        x_forwarded_for="203.0.113.10",
    ),
)

if not result.success:
    # request_ad_or_default falls back to the original prompt on failure
    # and stores the error object for inspection.
    print(f"Enhancement failed: {result.error}")

prompt_for_model = result.prompt
print(prompt_for_model)

# LLM call using the enhanced prompt.
llm_result = llm_client.responses.create(
    model="gpt-4.1-mini",
    input=prompt_for_model,
)
# Extract the final text output from the model response.
llm_response = llm_result.output_text

# Report final output for analytics/acknowledgment.
client.analyse_and_report(
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
- `x_forwarded_for`

If required values are missing or empty, SDK raise SDK validation exceptions.

## 5. Async integration example

Use async methods in async application servers or worker pipelines:

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
import asyncio
from adstractai import AdRequestConfiguration, Adstract
from openai import AsyncOpenAI


async def main() -> None:
    # Adstract client for prompt enhancement + reporting.
    client = Adstract()
    # Async LLM client.
    llm_client = AsyncOpenAI()

    result = await client.request_ad_or_default_async(
        prompt="Give me productivity tips",
        config=AdRequestConfiguration(
            session_id="session-abc",
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            ),
            x_forwarded_for="203.0.113.10",
        ),
    )

    if not result.success:
        print(f"Enhancement failed: {result.error}")

    # Async LLM call using the enhanced prompt.
    llm_result = await llm_client.responses.create(
        model="gpt-4.1-mini",
        input=result.prompt,
    )
    # Extract the final text output from the model response.
    llm_response = llm_result.output_text

    await client.analyse_and_report_async(enhancement_result=result, llm_response=llm_response)
    await client.aclose()


asyncio.run(main())
```

</TabItem>
</Tabs>

## 6. Method usage guidance

- `request_ad_or_default` and `request_ad_or_default_async` are the enhancement
  entrypoints. They always return an `EnhancementResult`.
- `analyse_and_report` and `analyse_and_report_async` are the reporting
  entrypoints. Call them after you receive the final LLM output.
- Validate `session_id`, `user_agent`, and `x_forwarded_for` before sending
  requests.
- Always close SDK and LLM clients in long-running services.

## 7. Where to go next

- [Pricing](/pricing) for current service pricing.
