---
title: Wrapping Modes
description: Configure XML or plain ad wrapping behavior.
---

This SDK version does not expose request-level ad constraints.

Instead, formatting behavior is controlled by `wrapping_type` when creating `Adstract`.

```python
from adstractai import AdRequestConfiguration, Adstract

client = Adstract(api_key="your-api-key", wrapping_type="xml")

result = client.request_ad_or_default(
    prompt="How to improve onboarding?",
    config=AdRequestConfiguration(
        session_id="sess-400",
        user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        x_forwarded_for="203.0.113.30",
    ),
)
```

## Available values

- `xml` (default): ad blocks are wrapped with `<ADS>...</ADS>` markers.
- `plain`: ad blocks are parsed with a plain delimiter (`\u02FC`) and sponsored label markers.

Use the same wrapping mode in your response handling and reporting path so analytics extraction stays accurate.
