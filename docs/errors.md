---
title: Errors
description: Typed exceptions raised by the SDK.
---

All SDK exceptions inherit from `AdSDKError`.

`request_ad_or_default` and `request_ad_or_default_async` capture errors and return them on `EnhancementResult.error` instead of raising.

```python
from adstractai import AdRequestConfiguration, Adstract
from adstractai.errors import AuthenticationError, MissingParameterError, RateLimitError, ServerError

client = Adstract(api_key="your-api-key")

result = client.request_ad_or_default(
    prompt="Explain unit economics",
    config=AdRequestConfiguration(
        session_id="sess-600",
        user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        x_forwarded_for="203.0.113.40",
    ),
)

if isinstance(result.error, AuthenticationError):
    print("Invalid API key")
elif isinstance(result.error, MissingParameterError):
    print("Required input is missing")
elif isinstance(result.error, RateLimitError):
    print("Slow down")
elif isinstance(result.error, ServerError):
    print("Try again later")
```

## Error types

- `ValidationError`: invalid input data
- `MissingParameterError`: required request parameter is empty or missing
- `AuthenticationError`: missing or invalid API key
- `RateLimitError`: request limit exceeded
- `ServerError`: server-side error (5xx)
- `NetworkError`: transport or timeout error
- `UnexpectedResponseError`: invalid response payload
