---
title: Responses
description: Understand EnhancementResult and AdResponse fields.
---

`request_ad_or_default` returns `EnhancementResult`.

`EnhancementResult` fields:

- `prompt`: enhanced prompt on success, original prompt on fallback.
- `success`: `True` when enhancement succeeded.
- `error`: captured exception on failure (method does not raise).
- `conversation`: resolved conversation context.
- `ad_response`: parsed `AdResponse` when available.

```python
result = client.request_ad_or_default(
    prompt="Explain SOC 2",
    config=config,
)

if result.success and result.ad_response and result.ad_response.aepi:
    print(result.ad_response.aepi.aepi_text)
    print(result.ad_response.tracking_url)
    print(result.ad_response.sponsored_label)
else:
    print(result.error)
```

`AdResponse` commonly includes `ad_request_id`, `ad_response_id`, `execution_time_ms`, `aepi`, `tracking_url`, `tracking_identifier`, `sponsored_label`, and `product_name`.
