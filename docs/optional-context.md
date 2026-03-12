---
title: OptionalContext
description: Detailed guide for the OptionalContext class and its optional ad targeting fields.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`OptionalContext` is an optional input object that provides additional targeting
context to improve ad relevance. All fields are optional — provide as much or
as little as available.

## Class purpose

This class exists to carry user and geographic context that helps Adstract
select more relevant ads for the opportunity:

- geographic context from the request origin; and
- demographic context for audience targeting.

## Class shape

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai.models import OptionalContext

optional_context = OptionalContext(
    country="US",
    region="California",
    city="San Francisco",
    asn=12345,
    age=30,
    gender="male",
)
```

</TabItem>
</Tabs>

## Fields

All fields are optional. Omit any you do not have or do not wish to provide.

- `country`
  - Type: `str | None`
  - Purpose: ISO 3166-1 alpha-2 country code (e.g., `"US"`, `"DE"`, `"BR"`).
  - Validation: Must be exactly 2 uppercase ASCII letters when provided.

- `region`
  - Type: `str | None`
  - Purpose: Region or state name (e.g., `"California"`).

- `city`
  - Type: `str | None`
  - Purpose: City name (e.g., `"San Francisco"`).

- `asn`
  - Type: `int | None`
  - Purpose: Autonomous System Number for network identification.

- `age`
  - Type: `int | None`
  - Purpose: User's age.
  - Validation: Must be an integer between 0 and 120 inclusive when provided.

- `gender`
  - Type: `str | None`
  - Purpose: User's gender.
  - Validation: Must be `"male"`, `"female"`, or `"other"` when provided.

## Validation behavior

- `OptionalContext` enforces a strict schema.
- Unknown/extra fields are rejected.
- Invalid field values (e.g., wrong country code format, out-of-range age,
  unsupported gender value) produce validation errors.

## Usage with request_ad

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai import Adstract
from adstractai.models import AdRequestContext, OptionalContext

client = Adstract(api_key="your-api-key")

context = AdRequestContext(
    session_id="session-abc",
    user_agent=(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    user_ip="203.0.113.10",
)

optional_context = OptionalContext(
    country="US",
    region="California",
    city="San Francisco",
    age=30,
    gender="male",
)

result = client.request_ad(
    prompt="How can I improve retention in my app?",
    context=context,
    optional_context=optional_context,
)
```

</TabItem>
</Tabs>

## Next steps

- Continue to [AdRequestContext](/ad-request-configuration) for required request context fields.
- Continue to [Synchronous Enhancement](/request-ad-or-default) for the full request flow.
- Continue to [Asynchronous Enhancement](/asynchronous-enhancement) for async usage.
