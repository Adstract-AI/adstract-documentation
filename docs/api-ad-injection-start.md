---
title: POST /api/ad-injection/start/
description: Create an ad request and run the ad injection pipeline.
---

Creates an ad request, executes the ad injection pipeline, and returns AEPI output when available.

## Endpoint

- Method: `POST`
- Path: `/api/ad-injection/start/`
- Content-Type: `application/json`

## Headers

- Required: `X-Adstract-API-Key`

## Request body

```json
{
  "prompt": "How can I improve conversion on my SaaS landing page?",
  "wrapping_type": "xml",
  "conversation": {
    "conversation_id": "conv-123",
    "session_id": "sess-123",
    "message_id": "msg_u_123"
  },
  "metadata": {
    "client": {
      "x_forwarded_for": "203.0.113.10",
      "device_type": "desktop",
      "os_family": "windows",
      "browser_family": "chrome",
      "sdk_version": "0.0.12"
    },
    "geo": {
      "geo_country": "US",
      "language": "en"
    }
  },
  "constraints": {
    "max_ads": 1,
    "min_similarity_hint": 0.2,
    "max_latency_ms_hint": 1200,
    "safe_mode": "standard"
  }
}
```

## Successful response (`201`)

```json
{
  "ad_request_id": "ac12d9db-e7f8-42f2-a101-7eed89693c43",
  "ad_response_id": "ac12d9db-e7f8-42f2-a101-7eed89693c43",
  "success": true,
  "execution_time_ms": 1025.65,
  "aepi": {
    "status": "ok",
    "aepi_text": "...enhanced prompt with ad instructions...",
    "checksum": "3683054a04bcb31e186e9439c6d2d0b0fd36b70c8d53c5ab3e847402418fb688",
    "size_bytes": 1726
  },
  "tracking_url": "https://your-tracking-domain/c/2uuRF2WHizzzYedtMcShvv",
  "product_name": "Adstract - LLM Advertising",
  "sponsored_label": "Sponsored",
  "tracking_identifier": "https://your-tracking-domain/c/2uuRF2WHizzzYedtMcShvv"
}
```

## Unsuccessful pipeline output (`201`)

The endpoint can still return `201` with `success: false` when processing completes but no valid ad output is produced.

```json
{
  "ad_request_id": "ac12d9db-e7f8-42f2-a101-7eed89693c43",
  "ad_response_id": "ac12d9db-e7f8-42f2-a101-7eed89693c43",
  "success": false,
  "execution_time_ms": 845.19,
  "aepi": null,
  "tracking_url": null,
  "product_name": null,
  "sponsored_label": "Sponsored",
  "tracking_identifier": null
}
```

## cURL example

```bash
curl -X POST "https://api.adstract.ai/api/ad-injection/start/" \
  -H "Content-Type: application/json" \
  -H "X-Adstract-API-Key: YOUR_API_KEY" \
  -d '{
    "prompt": "How do I reduce cloud costs?",
    "conversation": {
      "conversation_id": "conv-900",
      "session_id": "sess-900",
      "message_id": "msg_u_900"
    },
    "wrapping_type": "xml"
  }'
```

## Notes

- `conversation` is required.
- `wrapping_type` defaults to `xml` when omitted.
- `metadata` and `constraints` are optional, but must follow validation rules when provided.
