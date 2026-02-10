---
title: AdRequestConfiguration
description: Detailed guide for the AdRequestConfiguration class and each required field.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`AdRequestConfiguration` is the request-level input object used when calling
the Adstract client. It defines the runtime context Adstract needs to build
a valid ad-enhancement request.

## Class purpose

This class exists to carry request metadata that is required per call:

- conversation/session context;
- client identity context from the request origin; and
- network metadata used for analysis and reporting.

## Class shape

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai.models import AdRequestConfiguration

config = AdRequestConfiguration(
    session_id="session-abc",
    user_agent=(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    x_forwarded_for="203.0.113.10",
)
```

</TabItem>
</Tabs>

## Required fields

- `session_id`
  - Type: `str`
  - Purpose: Identifies the request session/conversation context.
  - Why it matters:
    - Adstract uses this value to resolve conversation tracking context for the request.

- `user_agent`
  - Type: `str`
  - Purpose: Carries client application/browser identity information.
  - Why it matters:
    - Used to derive request metadata such as device/browser characteristics.

- `x_forwarded_for`
  - Type: `str`
  - Purpose: Carries source IP-forwarding context.
  - Why it matters:
    - Used as part of metadata and reporting context in request processing.

All three fields are required for a valid configuration object.

## Validation behavior

- `AdRequestConfiguration` enforces a strict schema.
- Unknown/extra fields are rejected.
- Missing required fields produce validation errors.

## Usage with Adstract client

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai import Adstract
from adstractai.models import AdRequestConfiguration

client = Adstract(api_key="your-api-key")

config = AdRequestConfiguration(
    session_id="session-abc",
    user_agent=(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    x_forwarded_for="203.0.113.10",
)

result = client.request_ad_or_default(
    prompt="How can I improve retention in my app?",
    config=config,
)
```

</TabItem>
</Tabs>

## Next steps

- Continue to [Initialize Your Integration](/initialize-integration) to begin execution with a configured client.
- Continue to [Adstract Client](/client) for client-level runtime behavior.
- Continue to [EnhancementResult](/enhancement-result) for output handling.
- Continue to [Exception](/exception) for validation and runtime error behavior.
