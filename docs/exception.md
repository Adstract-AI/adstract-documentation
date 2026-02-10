---
title: Exceptions
description: Detailed reference for SDK exceptions and where they are raised.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

All SDK exceptions inherit from `AdSDKError`.

The exception model is split into:

- validation/input exceptions raised before or during request construction;
- transport/HTTP exceptions raised while communicating with Adstract; and
- response parsing exceptions raised when server payloads are invalid.

## SDK design approach

Adstract is designed for straightforward integration with minimal application
code changes.

- The fallback methods do not raise to the caller on enhancement failure.
- Instead, they always return an `EnhancementResult`.
- This keeps control flow simple and predictable.
- It also preserves fallback behavior so publisher applications can continue
  running close to their original pre-Adstract flow when enhancement fails.

## Base exception

- `AdSDKError`
    - Base type for all SDK-specific exceptions.
    - Can include:
        - `status_code`
        - `response_snippet`

## Validation and input exceptions

- `ValidationError`
    - Raised for invalid SDK inputs or invalid request construction state.
    - Typical trigger points:
        - invalid `api_key` during `Adstract(...)` initialization;
        - invalid `wrapping_type`;
        - invalid `user_agent` metadata input;
        - metadata build failures.

- `MissingParameterError`
    - Raised when required request parameters are missing/empty.
    - Typical trigger points:
        - missing `session_id`;
        - missing/empty `user_agent`;
        - missing/empty `x_forwarded_for`.

## Network and HTTP exceptions

- `NetworkError`
    - Raised for transport-level failures (timeouts/connectivity).
    - Includes `original_error` for underlying client failure context.

- `AuthenticationError`
    - Raised on authentication/authorization failures.
    - Typical HTTP statuses: `401`, `403`.

- `RateLimitError`
    - Raised after retry exhaustion when server keeps returning `429`.

- `ServerError`
    - Raised after retry exhaustion for `5xx` server responses.

## Response-shape exceptions

- `UnexpectedResponseError`
    - Raised when response payload cannot be safely consumed.
    - Typical trigger points:
        - unexpected `4xx` client error statuses (outside auth handling);
        - invalid JSON response body;
        - response JSON does not match expected SDK model shape.

## Fallback method behavior

`request_ad_or_default` and `request_ad_or_default_async` capture failures and
return them in `EnhancementResult.error` instead of raising to the caller.

## Exception handling pattern

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai import AdRequestConfiguration, Adstract
from adstractai.errors import AuthenticationError, MissingParameterError, NetworkError, RateLimitError, ServerError

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
    print("Authentication failed")
elif isinstance(result.error, MissingParameterError):
    print("Missing required request field")
elif isinstance(result.error, RateLimitError):
    print("Rate limited")
elif isinstance(result.error, ServerError):
    print("Server error")
elif isinstance(result.error, NetworkError):
    print("Network failure")
```

</TabItem>
</Tabs>

## Next steps

- Continue to [Initialize Your Integration](/initialize-integration) to begin the integration flow with a client instance.
- Continue to [Synchronous Analytics and Reporting](/analyse-and-report) for sync reporting behavior.
- Continue to [Asynchronous Analytics and Reporting](/asynchronous-analytics-and-reporting) for async reporting behavior.
- Continue to [Important and Disclaimers](/important-disclaimers) for compliance and policy-critical guidance.
