---
title: Synchronous Enhancement
description: Detailed guide for the request_ad_or_default method and its fallback-first behavior.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`request_ad_or_default` is the primary sync enhancement method in `Adstract`.
It follows a fallback-first design: your application always receives an
`EnhancementResult` and a usable `prompt` output.

## Method signature

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
result = client.request_ad_or_default(
    prompt="How can I improve user retention?",
    config=config,
)
```

</TabItem>
</Tabs>

## Inputs

- `prompt`
  - Type: `str`
  - Meaning: Original user prompt before enhancement.
  - Role: Source text Adstract attempts to enhance.

- `config`
  - Type: `AdRequestConfiguration`
  - Meaning: Request context object.
  - Required fields:
    - `session_id`
    - `user_agent`
    - `x_forwarded_for`

For full configuration details, see [AdRequestConfiguration](/ad-request-configuration).

## Output

This method returns an `EnhancementResult`.

- `result.prompt`
  - Enhanced prompt on success.
  - Original prompt on fallback.
- `result.success`
  - `True` when enhancement succeeds.
  - `False` when fallback path is used.
- `result.error`
  - `None` on success.
  - Captured exception on fallback failure path.
- `result.conversation`
  - Resolved conversation context used for downstream continuity.
- `result.ad_response`
  - Parsed response payload when available.

For output object details, see [EnhancementResult](/enhancement-result).

## Behavior model

The method flow is:

1. Build and validate request payload.
2. Send enhancement request to Adstract.
3. If enhancement is successful, return enhanced prompt.
4. If enhancement fails or response is not successful, return fallback result.

Fallback result means your app still gets a prompt and can continue its normal
LLM flow with minimal branching logic.

## Exception behavior

`request_ad_or_default` does not raise to the caller during normal enhancement
flow. Failures are captured inside `EnhancementResult.error`.

This design keeps integration code small and predictable, while preserving
application continuity when enhancement is unavailable.

For full exception reference, see [Exception](/exception).

## Minimal integration pattern

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai import Adstract
from adstractai.models import AdRequestConfiguration

client = Adstract(api_key="your-api-key")

config = AdRequestConfiguration(
    session_id="session-abc",
    user_agent="Mozilla/5.0 (X11; Linux x86_64)",
    x_forwarded_for="203.0.113.10",
)

result = client.request_ad_or_default(
    prompt="How can I improve user retention?",
    config=config,
)

prompt_for_model = result.prompt
```

</TabItem>
</Tabs>

## Next steps

- Continue to [Asynchronous Enhancement](/asynchronous-enhancement) for the async enhancement counterpart.
- Continue to [EnhancementResult](/enhancement-result) for result object details.
- Continue to [Synchronous Analytics and Reporting](/analyse-and-report) to complete the reporting cycle.
