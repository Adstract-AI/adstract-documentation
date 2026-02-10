---
title: Initialize Your Integration
description: Begin the runtime flow by instantiating the Adstract client.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Initialize your integration by creating an `Adstract` client instance.

## Instantiate the client

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
from adstractai import Adstract

client = Adstract(api_key="your-api-key")
```

</TabItem>
</Tabs>

## What this starts

- It initializes authentication and transport context.
- It prepares your app for enhancement calls.
- It establishes the runtime object used for reporting and cleanup.

## Next steps

- Continue to [Synchronous Enhancement](/request-ad-or-default).
- Continue to [Asynchronous Enhancement](/asynchronous-enhancement).
