---
title: API Errors
description: Error and validation behavior for the ad injection endpoint.
---

## Status code behavior

- `201 Created`: request accepted and pipeline executed (can be `success: true` or `success: false`).
- `400 Bad Request`: missing API key, validation failures, or request creation/service errors.
- `500 Internal Server Error`: unexpected unhandled server errors.

## Missing API key header

If `X-Adstract-API-Key` is missing, the endpoint returns `400`.

Example:

```json
{
  "detail": "API key is required in X-Adstract-API-Key header"
}
```

## Validation errors (`400`)

Validation uses serializer-level field and object checks. Typical failures:

- `prompt` shorter than 5 characters
- missing `conversation`
- empty `conversation_id`, `session_id`, or `message_id`
- unsupported `wrapping_type`
- invalid `constraints` values (`max_ads`, `min_similarity_hint`, `max_latency_ms_hint`, `safe_mode`)
- invalid `metadata` values (`geo_country`, `language`, `os_family`, `device_type`, `sdk_version`)

Example validation response:

```json
{
  "prompt": [
    "prompt must be at least 5 characters."
  ],
  "conversation": {
    "message_id": [
      "Must be a non-empty string."
    ]
  }
}
```

## Service-level creation errors (`400`)

If request creation fails (for example platform lookup or downstream internal creation failure), the API returns `400` with an error detail from the service exception.

Example:

```json
{
  "detail": "Failed to create ad request: ..."
}
```

## Integration recommendations

- Treat non-2xx responses as request failures.
- Treat `201` + `success: false` as a valid processed outcome without ad output.
- Log both `ad_request_id` and `execution_time_ms` for observability.
