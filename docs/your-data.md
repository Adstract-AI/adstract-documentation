---
title: Your data
description: What data Adstract uses and what data Adstract does not use.
---

Adstract uses only the data required to run enhancement and acknowledgment flows.

## Data Adstract uses

- `prompt`
  - Used as the source text for enhancement processing.
  - Required to generate the enhanced prompt output.

- `user_agent`
  - Used to derive client metadata context.
  - Supports request context integrity.

- `user_ip`
  - Used as request-origin network context.
  - Supports metadata generation and reporting context.

- `llm_response`
  - The final model response text is sent to the backend as part of
    the acknowledgment flow so Adstract can analyze the response outcome.
  - Adstract does not save `llm_response` in any form.
  - It is used only for analysis during acknowledgment processing.

## Optional targeting data

When provided via `OptionalContext`, the following fields may also be used:

- `country`, `region`, `city` — geographic targeting
- `asn` — network context
- `age`, `gender` — demographic targeting

These fields are entirely optional and are used only to improve ad relevance.

## Why this matters

- Only the data required to run the integration flow is used.
- Supports privacy and data-protection expectations in production integrations.
