---
title: Exceptions
description: Detailed reference for SDK exceptions and where they are raised.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

All SDK exceptions inherit from `AdSDKError`.

The exception model is split into:

- validation/input exceptions raised before or during request construction;
- transport/HTTP exceptions raised while communicating with Adstract;
- response parsing exceptions raised when server payloads are invalid; and
- ad enhancement exceptions raised when the enhancement pipeline does not produce an ad.

## SDK design approach

Adstract is designed for straightforward integration with minimal application
code changes.

- By default, `request_ad` and `request_ad_async` raise on any failure.
- Set `raise_exception=False` to enable fallback-first behavior: the method
  always returns an `EnhancementResult` and captures any failure in `error`.
- This keeps control flow simple and predictable when graceful degradation is preferred.
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
        - invalid `user_agent` or other parameter validation failures.

- `MissingParameterError`
    - Raised when required request parameters are missing/empty.
    - Typical trigger points:
        - missing `session_id`;
        - missing/empty `user_agent`;
        - missing/empty `user_ip`.

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

## Ad enhancement exceptions

- `AdEnhancementError`
    - Raised when the ad enhancement pipeline did not produce a usable result
      for a reason not covered by a more specific subclass.

- `PromptRejectedError` (subclass of `AdEnhancementError`)
    - Raised when the ad system determined the prompt content is not appropriate
      for advertisement placement (`status='rejected'`).

- `NoFillError` (subclass of `AdEnhancementError`)
    - Raised when the prompt was suitable for ad injection, but no matching ad
      inventory was available to fill the opportunity (`status='no_fill'`).

## Fallback method behavior

When `raise_exception=False` is passed to `request_ad` or `request_ad_async`,
failures are captured inside `EnhancementResult.error` instead of raising to
the caller.

## Exception handling pattern

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

<Tabs groupId="raise-exception">
<TabItem value="false" label="Fallback — errors captured in result" default>

```python
from adstractai import Adstract
from adstractai.models import AdRequestContext
from adstractai.errors import (
    AdEnhancementError,
    AuthenticationError,
    MissingParameterError,
    NetworkError,
    NoFillError,
    PromptRejectedError,
    RateLimitError,
    ServerError,
)

client = Adstract(api_key="your-api-key")

result = client.request_ad(
    prompt="Explain unit economics",
    context=AdRequestContext(
        session_id="sess-600",
        user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        user_ip="203.0.113.40",
    ),
    raise_exception=False,
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
elif isinstance(result.error, PromptRejectedError):
    print("Prompt rejected — not suitable for ad injection")
elif isinstance(result.error, NoFillError):
    print("No fill — no ad inventory available")
elif isinstance(result.error, AdEnhancementError):
    print("Ad enhancement failed")
```

</TabItem>
<TabItem value="true" label="Raising — exceptions thrown on failure">

```python
from adstractai import Adstract
from adstractai.models import AdRequestContext
from adstractai.errors import (
    AdEnhancementError,
    AuthenticationError,
    MissingParameterError,
    NetworkError,
    NoFillError,
    PromptRejectedError,
    RateLimitError,
    ServerError,
)

client = Adstract(api_key="your-api-key")

try:
    result = client.request_ad(
        prompt="Explain unit economics",
        context=AdRequestContext(
            session_id="sess-600",
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            user_ip="203.0.113.40",
        ),
    )
except AuthenticationError:
    print("Authentication failed")
except MissingParameterError:
    print("Missing required request field")
except RateLimitError:
    print("Rate limited")
except ServerError:
    print("Server error")
except NetworkError:
    print("Network failure")
except PromptRejectedError:
    print("Prompt rejected — not suitable for ad injection")
except NoFillError:
    print("No fill — no ad inventory available")
except AdEnhancementError:
    print("Ad enhancement failed")
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

## Next steps

- Continue to [Initialize Your Integration](/initialize-integration) to begin the integration flow with a client instance.
- Continue to [Synchronous Acknowledgment](/synchronous-acknowledgment) for sync reporting behavior.
- Continue to [Asynchronous Acknowledgment](/asynchronous-acknowledgment) for async reporting behavior.
- Continue to [Important and Disclaimers](/important-disclaimers) for compliance and policy-critical guidance.
