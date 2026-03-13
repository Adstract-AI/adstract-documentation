---
title: Enhancement Status Codes
description: Complete reference for every HTTP status code returned by the Adstract ad enhancement endpoint.
---

Every response from the Adstract ad enhancement endpoint carries an HTTP status
code. This page explains what each code means, what usually causes it, and how
your integration should react.

## Quick reference

| Code | Name | Category | Meaning |
|---|---|---|---|
| `200` | OK | Success | Ad injected, use `enhanced_prompt` |
| `201` | Created | Success | Request logged but prompt rejected, use original prompt |
| `202` | Accepted | Success | Request valid but no ad available, use original prompt |
| `400` | Bad Request | Client error | API key format is invalid |
| `401` | Unauthorized | Client error | API key is well-formed but not registered to a platform |
| `403` | Forbidden | Client error | Platform or publisher is not active |
| `422` | Unprocessable Entity | Client error | Request body failed validation |
| `429` | Too Many Requests | Client error | Rate limit exceeded |
| `5xx` | Server Error | Server error | Internal error, retry with backoff |

## `200 OK`

The prompt was analyzed, an ad was matched, and the prompt was enhanced
successfully. `success` is `true`, while `enhanced_prompt` and `product_name`
are populated.

This is the only enhancement outcome that should continue into the
acknowledgment step after your LLM produces its final response.

## `201 Created`

The request was received and logged, but the prompt was not considered suitable
for ad injection. No ad was embedded. `success` is `false`, and
`enhanced_prompt` and `product_name` are `null`.

Use the original prompt and continue your application flow without
acknowledgment.

Common cause: the prompt falls into a category where Adstract should not inject
ads.

## `202 Accepted`

The request was valid and accepted, but no suitable ad inventory was available
for this opportunity at that moment. No ad was embedded. `success` is `false`,
and `enhanced_prompt` and `product_name` are `null`.

Use the original prompt and continue without acknowledgment.

Common causes:

- No active advertisers matched the opportunity.
- Available inventory was exhausted.
- The request context did not match any live campaign.

## `400 Bad Request`

The value supplied in the `X-Adstract-API-Key` header is not in a valid API key
format. The server rejected the request before attempting platform lookup.

Typical causes:

- The key is malformed.
- A placeholder value such as `your-api-key` was sent.
- The header value is empty or truncated.

## `401 Unauthorized`

The `X-Adstract-API-Key` header is present and correctly formatted, but no
platform is registered to that key.

Typical causes:

- The key was copied incorrectly.
- The key belongs to a different environment.
- The key was deleted or never existed.

## `403 Forbidden`

The API key is valid and maps to an existing platform, but the request is not
permitted because of platform or publisher state.

This covers:

- paused or deleted platforms;
- suspended or deleted publisher accounts; and
- billing-key usage from an unverified publisher.

## `422 Unprocessable Entity`

The request body was parsed, but field-level validation failed.

Common causes:

- `prompt` is missing.
- `request_context` is missing.
- `session_id`, `user_agent`, or `user_ip` is missing inside `request_context`.
- A field has the wrong type or invalid structure.

## `429 Too Many Requests`

Your integration exceeded the request rate limit for the current time window.

Use exponential backoff and do not retry immediately.

## `5xx`

An unexpected error occurred on the Adstract server side. These failures are
not caused by your request payload.

Retry with exponential backoff. If they persist, pause rollout and investigate
before continuing traffic.

## Recommended handling

The common integration pattern is:

- `200`: use `enhanced_prompt`, call your LLM, then acknowledge.
- `201` or `202`: use the original prompt and skip acknowledgment.
- `400`, `401`, `403`, `422`: treat as integration/configuration issues.
- `429` and `5xx`: retry with backoff according to your reliability policy.

## Next steps

- [Ad Injection](/api-reference/ad-injection)
- [Response Body](/api-reference/api-response)
- [Acknowledgment Status Codes](/api-reference/acknowledgment-status-codes)
- [Ad Acknowledgment](/api-reference/ad-acknowledgment)
