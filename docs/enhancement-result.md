---
title: EnhancementResult
description: Detailed guide for the EnhancementResult class and how to use it safely in integration flows.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`EnhancementResult` is the primary output object returned by ad-enhancement
calls. It carries both success and fallback outcomes in a single, consistent
shape.

## Class purpose

This class exists to make application handling deterministic:

- your pipeline always receives a prompt to continue execution;
- success and failure state are explicit via `success` and `error`;
- conversation metadata is always preserved on the result; and
- backend response payload is available when present.

## Class shape

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai import Adstract
from adstractai.models import AdRequestConfiguration

client = Adstract(api_key="your-api-key")

result = client.request_ad_or_default(
    prompt="Explain SOC 2 for startups.",
    config=AdRequestConfiguration(
        session_id="sess-100",
        user_agent="Mozilla/5.0 (X11; Linux x86_64)",
        x_forwarded_for="203.0.113.10",
    ),
)
```

</TabItem>
</Tabs>

## Field reference

- `prompt`
  - Type: `str`
  - Meaning: Final prompt your application should use in the LLM call.
  - Behavior:
    - Enhanced prompt when ad enhancement succeeds.
    - Original prompt when fallback is used.

- `conversation`
  - Type: `Conversation`
  - Meaning: Resolved conversation context for tracking and reporting continuity.

- `ad_response`
  - Type: `AdResponse | None`
  - Meaning: Parsed backend response when available.
  - Behavior:
    - Can be `None` in error/fallback scenarios.

- `success`
  - Type: `bool`
  - Meaning: Outcome flag for enhancement operation.
  - Behavior:
    - `True` when enhancement succeeded.
    - `False` when fallback path was used.

- `error`
  - Type: `Exception | None`
  - Meaning: Captured failure context.
  - Behavior:
    - Populated when enhancement fails.
    - `None` on successful enhancement.

## Handling pattern

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
if result.success:
    prompt_for_model = result.prompt
else:
    print(result.error)
    prompt_for_model = result.prompt
```

</TabItem>
</Tabs>

## Next steps

- Continue to [Initialize Your Integration](/initialize-integration) to initialize the runtime before enhancement calls.
- Continue to [Synchronous Analytics and Reporting](/analyse-and-report) for sync reporting flow.
- Continue to [Asynchronous Analytics and Reporting](/asynchronous-analytics-and-reporting) for async reporting flow.
- Continue to [Exception](/exception) for runtime error type handling.
