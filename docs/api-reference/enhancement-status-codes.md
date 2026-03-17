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
| `401` | Unauthorized | Client error | No API key provided, or the API key is invalid |
| `403` | Forbidden | Client error | API key revoked, or platform/publisher is not active |
| `409` | Conflict | Client error | The provided message already has an ad request |
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

Common cause: the prompt falls into a category where Adstract does not inject
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

This code is returned when authentication credentials are missing or the API
key is invalid.

Typical causes:

- No API key was provided in the `X-Adstract-API-Key` header.
- The provided API key does not exist or is invalid.

## `403 Forbidden`

The API key is valid and maps to an existing platform, but the request is not
permitted because of platform or publisher state.

This covers:

- revoked API keys;
- paused platforms; and
- deleted or suspended publisher states.

## `409 Conflict`

The message you provided already has an ad request associated with it.

Do not retry the same message as a fresh enhancement request without first
changing the message identity or request flow.

## `5xx`

An unexpected error occurred on the Adstract server side. These failures are
not caused by your request payload.

Retry with exponential backoff. If they persist, pause rollout and investigate
before continuing traffic.

## Recommended handling

The common integration pattern is:

- `200`: use `enhanced_prompt`, call your LLM, then acknowledge.
- `201` or `202`: use the original prompt and skip acknowledgment.
- `400`, `401`, `403`, `409`: treat as integration/state issues and investigate.
- `5xx`: retry with backoff according to your reliability policy.

## Next steps

- [Ad Injection](/api-reference/ad-injection)
- [Enhancement Response Body](/api-reference/enhancement-response-body)
- [Acknowledgment Status Codes](/api-reference/acknowledgment-status-codes)
- [Ad Acknowledgment](/api-reference/ad-acknowledgment)
