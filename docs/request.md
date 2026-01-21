---
title: Ad Requests
description: The request payload structure for ad selection.
---

Requests are validated and converted into an `AdRequest` model before being sent.

## Required fields

- `prompt`: text prompt sent to your LLM (minimum length 3).
- `conversation`: identifying fields for the chat session.
- `user_agent`: required by the client to build metadata.

```python
from adstractai import AdClient

client = AdClient(api_key="your-api-key")
response = client.request_ad(
    prompt="What is RAG?",
    conversation={
        "conversation_id": "conv-100",
        "session_id": "sess-100",
        "message_id": "msg-100",
    },
    user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
)
```

## Conversation model

```python
conversation = {
    "conversation_id": "conv-123",
    "session_id": "session-abc",
    "message_id": "msg-001",
}
```

All three fields are required and must be non-empty strings.
