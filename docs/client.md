---
title: AdClient
description: Sync and async request APIs.
---

`AdClient` sends ad requests to the Adstract backend and returns typed responses.

## Sync API

```python
from adstractai import AdClient

client = AdClient(api_key="your-api-key")
response = client.request_ad(
    prompt="Explain vector databases",
    conversation={
        "conversation_id": "conv-001",
        "session_id": "sess-001",
        "message_id": "msg-001",
    },
    user_agent="Mozilla/5.0 (X11; Linux x86_64)",
)
```

## Async API

```python
import asyncio
from adstractai import AdClient


async def main() -> None:
    client = AdClient(api_key="your-api-key")
    response = await client.request_ad_async(
        prompt="How does caching help latency?",
        conversation={
            "conversation_id": "conv-002",
            "session_id": "sess-002",
            "message_id": "msg-002",
        },
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    )
    await client.aclose()


asyncio.run(main())
```

## Resource cleanup

- Call `close()` for sync clients when you own the underlying HTTP client.
- Call `aclose()` for async clients when you own the underlying HTTP client.
