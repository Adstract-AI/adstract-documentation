---
title: Configuration
description: API key, timeouts, retries, and HTTP clients.
---

## API key

`AdClient` reads your API key from the `ADSTRACT_API_KEY` environment variable by default.

```bash
export ADSTRACT_API_KEY="your-api-key"
```

You can also pass it explicitly:

```python
from adstractai import AdClient

client = AdClient(api_key="your-api-key")
```

## Client options

```python
from adstractai import AdClient

client = AdClient(
    api_key="your-api-key",
    timeout=15,
    retries=2,
    backoff_factor=0.5,
    max_backoff=8.0,
)
```

- `timeout`: request timeout in seconds.
- `retries`: number of retries for rate limits and 5xx errors.
- `backoff_factor`: exponential backoff base for retry sleep.
- `max_backoff`: maximum delay between retries.

## Custom HTTP clients

If you need custom transport settings, pass an `httpx.Client` or `httpx.AsyncClient`.

```python
import httpx
from adstractai import AdClient

sync_client = httpx.Client(timeout=20)
async_client = httpx.AsyncClient(timeout=20)

client = AdClient(http_client=sync_client, async_http_client=async_client)
```

When you pass custom clients, you are responsible for closing them.
