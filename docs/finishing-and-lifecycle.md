---
title: Finishing and Lifecycle
description: How to properly close Adstract client connections.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Finish the SDK lifecycle safely by closing the Adstract client in sync and async flows.

## Why closing matters

Closing the client prevents leaking open HTTP connections and keeps service
resource usage stable.

## Closing the client

Use `close()` in synchronous runtimes:

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai import Adstract

client = Adstract(api_key="your-api-key")
client.close()
```

</TabItem>
</Tabs>

Use the async close method in asynchronous runtimes:

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
import asyncio
from adstractai import Adstract


async def main() -> None:
    client = Adstract(api_key="your-api-key")
    await client.aclose()


asyncio.run(main())
```

</TabItem>
</Tabs>

## Ownership note

- If you pass custom `httpx` clients into `Adstract`, your application owns
  those clients and should close them directly.
- If `Adstract` creates internal clients, calling `close` or `aclose` handles
  cleanup.

## Next steps

- Continue to [Important and Disclaimers](/important-disclaimers).
