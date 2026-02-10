---
title: Introduction
description: What Adstract is, what problem it solves, and how the SDK fits into your architecture.
---

Adstract helps teams monetize LLM experiences by inserting relevant sponsored
content into prompts and providing reporting signals for measurement and policy
checks.

The SDK is the fastest way to integrate Adstract into an application
without building direct HTTP integrations.

## What Adstract does

Adstract sits between your user prompt and your model call:

1. Your app sends the original prompt to Adstract.
2. Adstract returns an enhanced prompt with ad instructions embedded.
3. Your app sends the enhanced prompt to your LLM provider.
4. Your app reports the final model output back to Adstract for analysis and
   acknowledgment tracking.

This flow keeps your application in control of LLM execution while letting
Adstract handle ad-enhancement and reporting logic.

## Why use the SDK

Use the SDK when you want:

- typed request/response models;
- sync and async client methods;
- built-in parameter validation and structured SDK errors;
- retry/timeouts and simple runtime configuration; and
- one integration path for enhancement and reporting.

## Integration model

At minimum, each request needs:

- `prompt`: user input text;
- `session_id`: session/conversation identifier;
- `user_agent`: client device/browser agent string; and
- `x_forwarded_for`: client IP-forwarding value used for metadata enrichment.

After enhancement, you submit the final LLM response back via reporting calls.

## Next steps

- Continue to [Quickstart](/quickstart) for the full setup and first integration flow.
