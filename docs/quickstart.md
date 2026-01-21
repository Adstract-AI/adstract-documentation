---
title: Quickstart
description: Send your first ad request with the SDK.
---

## Set your API key

```bash
export ADSTRACT_API_KEY="your-api-key"
```

## Make a request

```python
from adstractai import AdClient

client = AdClient()

response = client.request_ad(
    prompt="How do I improve analytics in my LLM app?",
    conversation={
        "conversation_id": "conv-123",
        "session_id": "session-abc",
        "message_id": "msg-001",
    },
    user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
)

print(response.raw)
```

## Async example

```python
import asyncio
from adstractai import AdClient


async def main() -> None:
    client = AdClient()
    response = await client.request_ad_async(
        prompt="Give me productivity tips",
        conversation={
            "conversation_id": "conv-123",
            "session_id": "session-abc",
            "message_id": "msg-002",
        },
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    )
    print(response.ads)
    await client.aclose()


asyncio.run(main())
```
