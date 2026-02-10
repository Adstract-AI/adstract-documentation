---
title: Synchronous Analytics and Reporting
description: Detailed guide for the analyse_and_report method and its reporting behavior.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`analyse_and_report` is the main synchronous reporting method in `Adstract`.
It analyzes the final LLM response after enhancement and sends acknowledgment
payloads to Adstract.

## Why this method is critical

This method closes the full ad workflow cycle.

- It confirms that the enhancement flow reached final output handling.
- It submits the required acknowledgment data for reporting.
- It is required for publisher-side monetization flow, because the reporting
  confirmation is part of how ad placement opportunity is accounted for.

## Method signature

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
client.analyse_and_report(
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
  - Role: Source object used for analytics/reporting context.

- `llm_response`
  - Type: `str`
  - Meaning: Final text returned by your LLM.
  - Role: Content analyzed for ad usage and reporting metrics.

For result object details, see [EnhancementResult](/enhancement-result).

## Output

This method returns `None`.

## Behavior model

The method flow is:

1. Check whether enhancement succeeded.
2. If enhancement did not succeed, reporting is skipped.
3. If enhancement succeeded, build analytics and acknowledgment payload.
4. Send the reporting payload to Adstract.
5. If analysis/reporting fails, attempt to send an error acknowledgment payload.
6. Re-raise the original analysis/reporting exception after error reporting attempt.

## Exception behavior

Unlike fallback enhancement methods, `analyse_and_report` may raise.

- If reporting/analysis fails, the method tries to submit an error reporting
  payload first.
- After that attempt, it re-raises the original exception so callers can handle
  failure explicitly.

For full exception reference, see [Exception](/exception).

## Privacy and data-protection note

The raw final LLM response text is not sent to the backend.

- Reporting sends derived analytics and tracking metadata.
- Sensitive content handling is minimized by design.
- The flow is designed with privacy, safety, and data-protection constraints in
  mind.

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

llm_response = "Your final model output here"

client.analyse_and_report(
    enhancement_result=result,
    llm_response=llm_response,
)
```

</TabItem>
</Tabs>

## Next steps

- Continue to [Asynchronous Analytics and Reporting](/asynchronous-analytics-and-reporting).
- Continue to [Exception](/exception) for exception behavior details.
- Continue to [Important and Disclaimers](/important-disclaimers) for critical integration caveats.
