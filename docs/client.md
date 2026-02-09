---
title: Adstract Client
description: Sync and async enhancement plus reporting APIs.
---

`Adstract` is the SDK entrypoint for ad enhancement and ad acknowledgment reporting.

## Sync enhancement

```python
from adstractai import AdRequestConfiguration, Adstract

client = Adstract(api_key="your-api-key")
result = client.request_ad_or_default(
    prompt="Explain vector databases",
    config=AdRequestConfiguration(
        session_id="sess-001",
        user_agent="Mozilla/5.0 (X11; Linux x86_64)",
        x_forwarded_for="198.51.100.44",
    ),
)

print(result.success)
print(result.prompt)
```

## Async enhancement

```python
import asyncio
from adstractai import AdRequestConfiguration, Adstract


async def main() -> None:
    client = Adstract(api_key="your-api-key")
    result = await client.request_ad_or_default_async(
        prompt="How does caching help latency?",
        config=AdRequestConfiguration(
            session_id="sess-002",
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            x_forwarded_for="198.51.100.45",
        ),
    )
    print(result.prompt)
    await client.aclose()


asyncio.run(main())
```

## Reporting methods

- `analyse_and_report(...)`: sends ad acknowledgment after your LLM returns a response.
- `analyse_and_report_async(...)`: async version for async application flows.

## Resource cleanup

- Call `close()` for sync clients when you own the underlying HTTP client.
- Call `aclose()` for async clients when you own the underlying HTTP client.
