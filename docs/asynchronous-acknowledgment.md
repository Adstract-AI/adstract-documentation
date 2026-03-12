---
title: Asynchronous Acknowledgment
description: Detailed guide for the acknowledge_async method and its reporting behavior.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`acknowledge_async` is the asynchronous reporting method in `Adstract`.
It reports the final LLM response after enhancement and sends an acknowledgment
payload to Adstract using async transport.

## Why this method is critical

This method closes the full ad workflow cycle in async pipelines.

- It confirms that the enhancement flow reached final output handling.
- It submits the required acknowledgment data for reporting.
- It is required for publisher-side monetization flow, because the reporting
  confirmation is part of how ad placement opportunity is accounted for.

## Method signature

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
await client.acknowledge_async(
    enhancement_result=result,
    llm_response=llm_response,
)
```

</TabItem>
</Tabs>

## Inputs

- `enhancement_result`
  - Type: `EnhancementResult`
  - Meaning: Result returned from the enhancement method.
  - Role: Source object used for reporting context.

- `llm_response`
  - Type: `str`
  - Meaning: Final text returned by your LLM.
  - Role: The actual model response that was produced with the enhanced prompt.

- `raise_exception`
  - Type: `bool`
  - Default: `True`
  - Meaning: Controls error handling behavior.
  - Behavior:
    - `True` (default): raises exceptions on failure.
    - `False`: logs errors but does not raise, avoiding disruption to main
      application flow.

For result object details, see [EnhancementResult](/enhancement-result).

## Output

This method returns `None`.

## Behavior model

The method flow is:

1. Check whether enhancement succeeded.
2. If enhancement did not succeed, reporting is skipped.
3. If enhancement succeeded, build the acknowledgment payload.
4. Send the acknowledgment payload to Adstract asynchronously.

## Exception behavior

With `raise_exception=True` (default), `acknowledge_async` raises on any reporting failure.

With `raise_exception=False`, errors are logged but not raised, avoiding disruption
to the main application flow.

For full exception reference, see [Exception](/exception).

## Privacy and data-protection note

The raw final LLM response text is sent to the backend for acknowledgment
and compliance verification. The flow is designed with privacy and safety
constraints in mind, and all analytics and compliance metrics are computed
on the backend.

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

    llm_response = "Your final model output here"

    await client.acknowledge_async(
        enhancement_result=result,
        llm_response=llm_response,
    )

    await client.aclose()


asyncio.run(main())
```

</TabItem>
</Tabs>

## Next steps

- Continue to [Synchronous Acknowledgment](/acknowledge).
- Continue to [Exception](/exception) for exception behavior details.
- Continue to [Important and Disclaimers](/important-disclaimers) for critical integration caveats.
