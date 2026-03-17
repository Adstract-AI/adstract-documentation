---
title: AdAckResponse
description: Detailed guide for the AdAckResponse class and how to interpret acknowledgment outcomes.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`AdAckResponse` is the parsed output object returned by successful acknowledgment
calls. It tells your application that Adstract accepted the acknowledgment and
how that acknowledgment was normalized on the backend.

## Class purpose

This class exists to make acknowledgment handling explicit:

- the acknowledgment record identifier is always returned;
- the normalized backend outcome is surfaced through `status`; and
- the final acknowledgment result is exposed through `success`.

## Class shape

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
ack = client.acknowledge(
    enhancement_result=result,
    llm_response=llm_response,
)
```

</TabItem>
</Tabs>

## Field reference

- `ad_ack_id`
  - Type: `str`
  - Meaning: Unique identifier of the created acknowledgment record.
  - Behavior:
    - Present on all successful acknowledgment responses.

- `status`
  - Type: `str`
  - Meaning: Normalized acknowledgment outcome returned by Adstract.
  - Behavior:
    - `ok` when acknowledgment completed normally.
    - `no_ad_used` when acknowledgment completed successfully but the final LLM response did not use the ad.
    - `recoverable_error` when Adstract accepted the acknowledgment but encountered a recoverable issue in follow-up backend processing.

- `success`
  - Type: `bool`
  - Meaning: Whether the acknowledgment itself completed successfully.
  - Behavior:
    - `True` when `status` is `ok` or `no_ad_used`.
    - `False` when `status` is `recoverable_error`.

## Handling pattern

<Tabs groupId="sdk-language">
<TabItem value="python" label="Python" default>

```python
if ack is not None:
    print(ack.ad_ack_id)

    if ack.success:
        print(ack.status)
    else:
        print(ack.status)
```

</TabItem>
</Tabs>

## Next steps

- Continue to [Synchronous Acknowledgment](/synchronous-acknowledgment) for sync acknowledgment flow.
- Continue to [Asynchronous Acknowledgment](/asynchronous-acknowledgment) for async acknowledgment flow.
- Continue to [Exception](/exception) for acknowledgment error type behavior.
- Continue to [Finishing and Lifecycle](/finishing-and-lifecycle) to close the client cleanly.
