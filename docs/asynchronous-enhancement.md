---
title: Asynchronous Enhancement
description: Detailed guide for the async enhancement method and its error handling behavior.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The async enhancement method is the asynchronous counterpart of the sync
enhancement flow in `Adstract`.

By default it raises on failure. Pass `raise_exception=False` for
fallback-first behavior: your application always receives an
`EnhancementResult` and a usable `prompt` output.

## Method signature

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
result = await client.request_ad_async(
    prompt="How can I improve user retention?",
    context=context,
)
```

</TabItem>
</Tabs>

## Inputs

- `prompt`
  - Type: `str`
  - Meaning: Original user prompt before enhancement.
  - Role: Source text Adstract attempts to enhance.

- `context`
  - Type: `AdRequestContext`
  - Meaning: Request context object.
  - Required fields:
    - `session_id`
    - `user_agent`
    - `user_ip`

- `optional_context`
  - Type: `OptionalContext | None`
  - Meaning: Optional targeting context for improved ad relevance.
  - Optional fields:
    - `country` (ISO 3166-1 alpha-2 code, e.g. `"US"`)
    - `region` (e.g. `"California"`)
    - `city` (e.g. `"San Francisco"`)
    - `asn` (Autonomous System Number)
    - `age` (integer 0–120)
    - `gender` (`"male"`, `"female"`, or `"other"`)

- `raise_exception`
  - Type: `bool`
  - Default: `True`
  - Meaning: Controls error handling behavior.
  - Behavior:
    - `True` (default): raises exceptions on any failure.
    - `False`: captures failures in `EnhancementResult.error` and returns
      original prompt as fallback.

For full context details, see [AdRequestContext](/ad-request-configuration).
For targeting details, see [OptionalContext](/optional-context).

## Output

This method returns an `EnhancementResult`.

- `result.prompt`
  - Enhanced prompt on success.
  - Original prompt on fallback (when `raise_exception=False`).
- `result.success`
  - `True` when enhancement succeeds.
  - `False` when fallback path is used.
- `result.error`
  - `None` on success.
  - Captured exception on fallback failure path.
- `result.session_id`
  - Session identifier used for this request.
- `result.ad_response`
  - Parsed response payload when available.

For output object details, see [EnhancementResult](/enhancement-result).

## Behavior model

The method flow is:

1. Build and validate request payload.
2. Send asynchronous enhancement request to Adstract.
3. If enhancement is successful and an enhanced prompt is returned, return it.
4. If the response status is `rejected`, raise (or capture) `PromptRejectedError`.
5. If the response status is `no_fill`, raise (or capture) `NoFillError`.
6. If any other failure occurs, raise (or capture) the appropriate exception.

When `raise_exception=False`, fallback result means your async pipeline still
gets a prompt and can continue without complex error branching.

## Exception behavior

With `raise_exception=True` (default), `request_ad_async` raises on all failures:

- `MissingParameterError` — required parameters missing
- `NetworkError` — transport/connectivity failure
- `AuthenticationError` — authentication/authorization failure
- `RateLimitError` — rate limit exceeded after retries
- `ServerError` — server error after retries
- `PromptRejectedError` — prompt not suitable for ad injection
- `NoFillError` — no ad inventory available
- `AdEnhancementError` — enhancement failed for another reason

With `raise_exception=False`, all errors are captured in `EnhancementResult.error`.

For full exception reference, see [Exception](/exception).

## Minimal async integration pattern

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
import asyncio
from adstractai import Adstract
from adstractai.models import AdRequestContext


async def main() -> None:
    client = Adstract(api_key="your-api-key")

    context = AdRequestContext(
        session_id="session-abc",
        user_agent="Mozilla/5.0 (X11; Linux x86_64)",
        user_ip="203.0.113.10",
    )

    result = await client.request_ad_async(
        prompt="How can I improve user retention?",
        context=context,
    )

    prompt_for_model = result.prompt
    await client.aclose()


asyncio.run(main())
```

</TabItem>
</Tabs>

## Next steps

- Continue to [EnhancementResult](/enhancement-result) for result object details.
- Continue to [Asynchronous Acknowledgment](/asynchronous-acknowledgment) to complete the reporting cycle in async flows.
- Continue to [Exception](/exception) for full SDK exception behavior.
