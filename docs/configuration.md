---
title: Configuration
description: API key, timeouts, retries, and HTTP clients.
---

## API key

`Adstract` reads your API key from `ADSTRACT_API_KEY` by default.

```bash
export ADSTRACT_API_KEY="your-api-key"
```

You can also pass it explicitly:

```python
from adstractai import Adstract

client = Adstract(api_key="your-api-key")
```

## Client options

```python
from adstractai import Adstract

client = Adstract(
    api_key="your-api-key",
    timeout=15,
    retries=1,
    backoff_factor=0.5,
    max_backoff=8.0,
    wrapping_type="xml",
)
```

- `timeout`: request timeout in seconds.
- `retries`: retry attempts for rate limits and 5xx errors (max supported value is 1).
- `backoff_factor`: exponential backoff base for retry sleep.
- `max_backoff`: maximum delay between retries.
- `wrapping_type`: ad wrapping mode, either `xml` or `plain`.

## Custom HTTP clients

If you need custom transport settings, pass an `httpx.Client` or `httpx.AsyncClient`.

```python
import httpx
from adstractai import Adstract

sync_client = httpx.Client(timeout=20)
async_client = httpx.AsyncClient(timeout=20)

client = Adstract(http_client=sync_client, async_http_client=async_client)
```

When you pass custom clients, you are responsible for closing them.
