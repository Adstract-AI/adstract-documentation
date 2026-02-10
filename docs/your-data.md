---
title: Your data
description: What data Adstract uses and what data Adstract does not use.
---

Adstract uses only the data required to run enhancement and reporting flows.

## Data Adstract uses

- `prompt`
  - Used as the source text for enhancement processing.
  - Required to generate the enhanced prompt output.

- `user_agent`
  - Used to derive client metadata context.
  - Supports analysis/reporting quality and request context integrity.

- `x_forwarded_for`
  - Used as request-origin network context.
  - Supports metadata generation and reporting context.

## Data Adstract does not use

- `llm_response`
  - The raw final model response content is not sent to backend reporting as-is.
  - Reporting uses derived analytics and tracking metadata instead.

## Why this matters

- Reduces unnecessary exposure of model output content.
- Supports privacy and data-protection expectations in production integrations.
