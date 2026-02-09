---
title: Adstract AI Python SDK
description: Python SDK for ad-enhanced prompts and ad acknowledgment reporting.
---

The Adstract AI Python SDK helps you inject ad-enhanced prompt content into your LLM flow and report ad usage back to Adstract.

## Install

```bash
python -m pip install adstractai
```

## Requirements

- Python 3.10+
- An Adstract API key

## Basic flow

1. Create an `Adstract` client.
2. Build an `AdRequestConfiguration` with `session_id` or `conversation`, plus `user_agent` and `x_forwarded_for`.
3. Call `request_ad_or_default` to get an `EnhancementResult`.
4. Send `EnhancementResult.prompt` to your LLM.
5. Call `analyse_and_report` with the final LLM response.

## Package surface

- `Adstract` client for sync and async enhancement/reporting
- `AdRequestConfiguration` for request input
- `EnhancementResult` and `AdResponse` for response handling
- `Conversation` and metadata models
- Typed SDK error classes for runtime failures
