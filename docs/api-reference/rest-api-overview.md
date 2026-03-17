---
title: REST API Overview
description: Entry point for the Adstract REST API, its flow, and its reference pages.
---

The Adstract REST API gives you direct HTTP access to the full Adstract flow.
It is the non-SDK integration path and can be used from any language or runtime
that can make HTTPS requests.

## What the REST API covers

The REST API flow is built around two endpoints:

- ad enhancement, where you send the original prompt and request context; and
- ad acknowledgment, where you report the final LLM response after a successful enhancement.

Together, these endpoints let you:

- request ad-enhanced prompt content;
- handle fallback outcomes when no ad should be injected;
- send the final response back to Adstract; and
- complete the reporting cycle for paid ad usage.

## Integration flow

1. Send your prompt to the ad enhancement endpoint.
2. Read the HTTP status code and response body.
3. If enhancement succeeds, send `enhanced_prompt` to your LLM.
4. If enhancement falls back, continue with the original prompt.
5. After a successful enhancement flow, call the acknowledgment endpoint with the final LLM response.

## Authentication

All REST API calls use the `X-Adstract-API-Key` header.

For full authentication details, see [Authentication](/api-reference/api-authentication).

## Next steps

- Continue to [Ad Injection](/api-reference/ad-injection).
- Continue to [Ad Acknowledgment](/api-reference/ad-acknowledgment).
- Continue to [Quickstart](/quickstart) for side-by-side SDK and REST examples.
