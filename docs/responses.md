---
title: Responses
description: The AdResponse payload and how to use it.
---

`request_ad` returns an `AdResponse` object with the raw JSON payload and a convenience `ads` list when present.

```python
response = client.request_ad(
    prompt="Explain SOC 2",
    conversation={
        "conversation_id": "conv-500",
        "session_id": "sess-500",
        "message_id": "msg-500",
    },
    user_agent="Mozilla/5.0 (X11; Linux x86_64)",
)

print(response.raw)
print(response.ads)
```

`response.raw` includes the full JSON payload returned by the API. `response.ads` is `None` if the response does not include an `ads` list.
