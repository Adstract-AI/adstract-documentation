---
title: Adstract AI Python SDK
description: Python client for requesting ads to inject into LLM responses.
---

The Adstract AI Python SDK lets you request ad placements for an LLM response and receive a structured payload with ad content. Use it in your backend or application server to enrich responses with sponsored content.

## Install

```bash
python -m pip install adstractai
```

## Requirements

- Python 3.10+
- An Adstract API key

## Basic flow

1. Create an `AdClient` with your API key.
2. Send a request with prompt, conversation info, and user context.
3. Use the response payload to inject or render ads.

## Package surface

- `AdClient` for sync and async requests
- `AdRequest` and `AdResponse` models
- `Metadata`, `ClientMetadata`, `GeoMetadata`
- `Constraints` for targeting and safety controls
- Structured error types for reliable handling
