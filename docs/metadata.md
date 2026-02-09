---
title: Metadata
description: How client metadata is generated from request context.
---

The SDK builds `metadata.client` automatically from `user_agent` and `x_forwarded_for`.

## Client metadata

These fields are derived and sent automatically:

- `user_agent_hash`
- `device_type`
- `os_family`
- `browser_family`
- `sdk_version`
- `x_forwarded_for`

Example request:

```python
from adstractai import AdRequestConfiguration, Adstract

client = Adstract(api_key="your-api-key")
result = client.request_ad_or_default(
    prompt="Summarize the benefits of SSO",
    config=AdRequestConfiguration(
        session_id="sess-200",
        user_agent="Mozilla/5.0 (X11; Linux x86_64)",
        x_forwarded_for="203.0.113.20",
    ),
)
```

`result` does not expose metadata directly, but this metadata is included in the request payload sent by the SDK.

Geo helper hooks such as `geo_provider` and `accept_language` are not part of this SDK version.
