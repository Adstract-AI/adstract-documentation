---
title: Adstract Client
description: Reference guide for the Adstract client class, its configuration, and lifecycle behavior.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`Adstract` is the main client class used to connect your application to Adstract.
It centralizes authentication, network configuration, retry behavior, transport
injection, and cleanup.

## Class role

At the class level, `Adstract` is responsible for:

- holding your API authentication context;
- applying global client configuration to requests;
- managing sync and async transport clients;
- enforcing input validation at client setup; and
- providing deterministic lifecycle cleanup (`close` / `aclose`).

## Initialization

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai import Adstract

client = Adstract(
    api_key="your-api-key",
    base_url=None,
    timeout=100,
    retries=0,
    backoff_factor=0.5,
    max_backoff=8.0,
    http_client=None,
    async_http_client=None,
    wrapping_type="xml",
)
```

</TabItem>
</Tabs>

## Configuration reference

- `api_key`
  - Type: `str | None`
  - Purpose: Authenticates your client with Adstract.
  - Behavior:
    - If omitted, SDK reads `ADSTRACT_API_KEY` from environment.
    - Must be a non-empty string with minimum length requirements.

- `base_url`
  - Type: `str | None`
  - Purpose: Overrides the default Adstract API host for this client instance.
  - Behavior:
    - If `None`, SDK uses the default platform URL.

- `timeout`
  - Type: `float`
  - Purpose: Sets request timeout behavior for transport operations.
  - Behavior:
    - Applied to internally created sync and async HTTP clients.

- `retries`
  - Type: `int`
  - Purpose: Controls automatic retry attempts for retryable failures.
  - Behavior:
    - SDK caps supported retry attempts.
    - Values above the supported cap fall back to SDK default.

- `backoff_factor`
  - Type: `float`
  - Purpose: Configures exponential retry delay growth.
  - Behavior:
    - Higher values increase wait time between retry attempts.

- `max_backoff`
  - Type: `float`
  - Purpose: Sets an upper bound for retry delay.
  - Behavior:
    - Prevents retry backoff from growing without limit.

- `http_client`
  - Type: `httpx.Client | None`
  - Purpose: Injects a custom synchronous transport client.
  - Behavior:
    - If omitted, SDK creates and owns an internal sync client.
    - If provided, caller owns lifecycle and should close it.

- `async_http_client`
  - Type: `httpx.AsyncClient | None`
  - Purpose: Injects a custom asynchronous transport client.
  - Behavior:
    - If omitted, SDK creates and owns an internal async client.
    - If provided, caller owns lifecycle and should close it.

- `wrapping_type`
  - Type: `"xml" | "plain" | None`
  - Purpose: Configures how Adstract instructs the LLM to wrap ad content,
    which directly affects how the final response should be analyzed.
  - Behavior:
    - Supported values: `xml`, `plain`.
    - If omitted, defaults to `xml`.

## Validation behavior

- Initialization raises `ValidationError` if:
  - API key is missing/invalid after environment resolution.
  - `wrapping_type` is outside supported values.

## Client lifecycle

- Use `close()` for sync cleanup.
- Use `aclose()` for async cleanup.
- If you pass custom HTTP clients, your application owns their lifecycle.

## Transport ownership model

`Adstract` can run in two transport modes:

- Internal transport mode:
  - SDK creates sync/async clients from your timeout and retry config.
  - SDK closes those clients when you call `close` / `aclose`.
- External transport mode:
  - You pass `http_client` and/or `async_http_client`.
  - Your application is responsible for their lifecycle and shutdown.

## Minimal client example

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai import Adstract

client = Adstract(api_key="your-api-key")
```

</TabItem>
</Tabs>

## Next steps

- Continue to [Initialize Your Integration](/initialize-integration) to instantiate the client in the runtime flow.
- Continue to [AdRequestConfiguration](/ad-request-configuration) for request-level configuration fields.
- Continue to [EnhancementResult](/enhancement-result) for output handling.
- Continue to [Exception](/exception) for error type behavior.
