---
title: Metadata
description: Client and geo metadata for ad targeting.
---

Metadata provides information about the user and request context. The SDK merges derived metadata from `user_agent` with any explicit values you provide.

## Client metadata

The SDK derives these automatically from the `user_agent` string:

- `user_agent_hash`
- `device_type`
- `os_family`
- `browser_family`
- `sdk_version`

You can override or extend values by passing `metadata`:

```python
from adstractai import AdClient

client = AdClient(api_key="your-api-key")
response = client.request_ad(
    prompt="Summarize the benefits of SSO",
    conversation={
        "conversation_id": "conv-200",
        "session_id": "sess-200",
        "message_id": "msg-200",
    },
    user_agent="Mozilla/5.0 (X11; Linux x86_64)",
    metadata={
        "client": {
            "referrer": "https://docs.example.com",
        }
    },
)
```

## Geo metadata

Geo fields support ISO-2 country codes and optional language data.

```python
metadata = {
    "geo": {
        "geo_country": "US",
        "geo_region": "CA",
        "city": "San Francisco",
        "language": "en-US",
    }
}
```

## Geo provider helper

You can supply a `geo_provider` function and `x_forwarded_for` to enrich geo data.

```python
from adstractai import AdClient


def geo_provider(ip: str) -> dict:
    return {"geo_country": "US", "geo_region": "NY", "city": "New York"}


client = AdClient(api_key="your-api-key")
response = client.request_ad(
    prompt="Best note taking apps",
    conversation={
        "conversation_id": "conv-300",
        "session_id": "sess-300",
        "message_id": "msg-300",
    },
    user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    x_forwarded_for="203.0.113.10",
    geo_provider=geo_provider,
)
```

## Accept-Language parsing

If you pass `accept_language`, the SDK will populate `metadata.geo.language` when it is not already set.

```python
response = client.request_ad(
    prompt="How to manage costs?",
    conversation={
        "conversation_id": "conv-301",
        "session_id": "sess-301",
        "message_id": "msg-301",
    },
    user_agent="Mozilla/5.0 (X11; Linux x86_64)",
    accept_language="en-US,en;q=0.9",
)
```
