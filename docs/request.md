---
title: Ad Requests
description: Input configuration and validation for ad enhancement.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

All requests are normalized into an `AdRequest` model before being sent.

## Required fields

- `prompt`: text prompt sent to your LLM (minimum length 3).
- `config.user_agent`: required for metadata generation.
- `config.x_forwarded_for`: required for client context.
- `config.session_id` or `config.conversation`: one of these is required.

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai import AdRequestConfiguration, Adstract

client = Adstract(api_key="your-api-key")
result = client.request_ad_or_default(
    prompt="What is RAG?",
    config=AdRequestConfiguration(
        session_id="sess-100",
        user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        x_forwarded_for="203.0.113.10",
    ),
)
```

</TabItem>
</Tabs>

## Conversation model

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
conversation = {
    "conversation_id": "conv-123",
    "session_id": "session-abc",
    "message_id": "msg_u_001",
}
```

</TabItem>
</Tabs>

All three fields are required and must be non-empty strings.

If both `session_id` and `conversation` are provided, `conversation` takes precedence.
