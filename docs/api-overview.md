---
title: API Overview
description: HTTP integration overview for the Adstract ad injection endpoint.
---

The Adstract HTTP API lets you request ad-enhanced prompt instructions directly from your backend without using the SDK.

## Base path

- Base route: `/api/ad-injection/`
- Current endpoint: `POST /api/ad-injection/start/`

## Authentication

Send your API key in the `X-Adstract-API-Key` request header.

```http
X-Adstract-API-Key: <your-api-key>
```

If the header is missing, the endpoint returns `400`.

## Request lifecycle

1. Validate request payload (`prompt`, `conversation`, optional metadata/constraints).
2. Resolve platform by API key and persist an ad request record.
3. Run ad injection pipeline (moderation, fraud, embedding, vector search, auction, finishing).
4. Return a normalized response payload with execution status and optional AEPI data.

## Response behavior

- HTTP status is `201 Created` when the request is accepted and processed by the pipeline.
- `success: true` means ad injection completed successfully.
- `success: false` means no usable ad output was produced; optional fields are returned as `null`.

## Next pages

- `api-ad-injection-start`: endpoint contract and examples
- `api-schemas`: field-level schema reference
- `api-errors`: validation and error response patterns
