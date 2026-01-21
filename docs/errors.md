---
title: Errors
description: Typed exceptions raised by the SDK.
---

All errors inherit from `AdSDKError`. Handle them in order of specificity.

```python
from adstractai import AdClient
from adstractai import AuthenticationError, RateLimitError, ServerError

client = AdClient(api_key="your-api-key")

try:
    client.request_ad(
        prompt="Explain unit economics",
        conversation={
            "conversation_id": "conv-600",
            "session_id": "sess-600",
            "message_id": "msg-600",
        },
        user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    )
except AuthenticationError:
    print("Invalid API key")
except RateLimitError:
    print("Slow down")
except ServerError:
    print("Try again later")
```

## Error types

- `ValidationError`: invalid input data
- `AuthenticationError`: missing or invalid API key
- `RateLimitError`: request limit exceeded
- `ServerError`: server-side error (5xx)
- `NetworkError`: transport or timeout error
- `UnexpectedResponseError`: invalid response payload
