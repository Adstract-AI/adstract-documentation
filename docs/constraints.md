---
title: Constraints
description: Control safety and targeting for ad selection.
---

Constraints are optional but useful for ad controls and targeting.

```python
from adstractai import AdClient

client = AdClient(api_key="your-api-key")
response = client.request_ad(
    prompt="How to improve onboarding?",
    conversation={
        "conversation_id": "conv-400",
        "session_id": "sess-400",
        "message_id": "msg-400",
    },
    user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    constraints={
        "max_ads": 2,
        "safe_mode": "standard",
        "allow_click_tracking": True,
        "allow_impressions_tracking": True,
        "tag": "b2b",
    },
)
```

## Fields

- `max_ads` (1-20): number of ads to return
- `required_sponsored_label`: require a sponsored label in the creative
- `allow_click_tracking`: allow click tracking URLs
- `allow_impressions_tracking`: allow impression tracking URLs
- `min_similarity_hint`: float between 0 and 1
- `max_latency_ms_hint`: max response latency in milliseconds
- `safe_mode`: `strict`, `standard`, or `off`
- `tag`: optional targeting tag
- `blocked_document_types`: list of `doc_type` values
- `blocked_geo_tags`: list of ISO-2 country codes
- `ideal_geo_tags`: list of ISO-2 country codes
