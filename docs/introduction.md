---
title: Introduction
description: What Adstract is, what problem it solves, and how the SDK fits into your architecture.
---

Adstract helps teams monetize LLM experiences by inserting relevant sponsored
content into prompts and providing reporting signals for measurement and policy
checks.

Adstract can be accessed directly via the REST API or through the Python SDK,
which wraps the API with typed models, validation, and built-in retries.

## What Adstract does

Adstract sits between your user prompt and your model call:

1. Your app sends the original prompt to Adstract.
2. Adstract returns an enhanced prompt with ad instructions embedded.
3. Your app sends the enhanced prompt to your LLM provider.
4. Your app reports the final model output back to Adstract for acknowledgment.

This flow keeps your application in control of LLM execution while letting
Adstract handle ad-enhancement and reporting logic.

## Why use the SDK

Use the Python SDK when you want:

- typed request/response models;
- sync and async client methods;
- built-in parameter validation and structured SDK errors;
- retry/timeouts and simple runtime configuration; and
- one integration path for enhancement and reporting.

## Why use the REST API directly

Use the REST API directly when you want:

- language-agnostic integration — any HTTP client works;
- minimal dependencies in your stack; or
- full control over request construction and error handling.

## Integration model

At minimum, each request needs:

- `prompt`: user input text;
- `session_id`: session/conversation identifier;
- `user_agent`: client device/browser agent string; and
- `user_ip`: client IP address used for metadata enrichment.

After enhancement, you submit the final LLM response back via `acknowledge` or `acknowledge_async`.

## Next steps

- Continue to [Adstract Hub](/adstract-hub) to experience the platform without writing any code.
- Continue to [Quickstart](/quickstart) for the full SDK setup and first integration flow.
- Continue to [REST API](/api-reference/api-authentication) to integrate directly over HTTP.
