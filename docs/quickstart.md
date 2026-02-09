---
title: Quickstart
description: Make your first ad enhancement request and report usage.
---

## Set your API key

```bash
export ADSTRACT_API_KEY="your-api-key"
```

## Make a request

```python
from adstractai import AdRequestConfiguration, Adstract

client = Adstract()

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

print(result.success)
print(result.prompt)

# Your application sends result.prompt to an LLM and gets llm_response.
llm_response = result.prompt
client.analyse_and_report(enhancement_result=result, llm_response=llm_response)
client.close()
```

## Async example

```python
import asyncio
from adstractai import AdRequestConfiguration, Adstract


async def main() -> None:
    client = Adstract()
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

    llm_response = result.prompt
    await client.analyse_and_report_async(enhancement_result=result, llm_response=llm_response)
    await client.aclose()


asyncio.run(main())
```
