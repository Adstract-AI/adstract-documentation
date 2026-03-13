---
title: Acknowledgment Status Codes
description: Complete reference for every HTTP status code returned by the Adstract acknowledgment endpoint.
---

Every response from the Adstract acknowledgment endpoint carries an HTTP status
code. This page explains what each code means, when it happens, and how your
integration should handle it.

## Quick reference

| Code | Name | Category | Meaning |
|---|---|---|---|
| `200` | OK | Success | Acknowledgment fully processed, ad cycle complete |
| `201` | Created | Success | Acknowledgment logged, publisher is still credited |
| `400` | Bad Request | Client error | API key format is invalid, or the ad response was not a successful enhancement |
| `401` | Unauthorized | Client error | API key is well-formed but not registered to a platform |
| `403` | Forbidden | Client error | Platform or publisher is not active, or the ad response does not belong to this platform |
| `404` | Not Found | Client error | `ad_response_id` does not exist |
| `409` | Conflict | Client error | The ad response was already acknowledged |
| `5xx` | Server Error | Server error | Outcome is unknown, stop Adstract services until resolved |

## `200 OK`

The acknowledgment was received and fully processed. The ad cycle is complete.

## `201 Created`

The acknowledgment was received and logged successfully, and the publisher will
still be credited. A non-critical post-processing step encountered an issue on
the Adstract side and will be resolved automatically.

No action is required from the integration.

## `400 Bad Request`

This code is returned when one of these conditions applies:

- the `X-Adstract-API-Key` header value is not in a valid format; or
- the provided `ad_response_id` does not refer to a successful enhancement.

Only successful enhancement results should be acknowledged.

## `401 Unauthorized`

The `X-Adstract-API-Key` header is present and well-formed, but no platform is
registered to that key.

## `403 Forbidden`

The API key is valid, but the request is not allowed.

This usually means:

- the platform or publisher account is not active; or
- the `ad_response_id` does not belong to the platform associated with the key.

## `404 Not Found`

The `ad_response_id` does not exist in the Adstract system.

Verify that you are passing the exact value returned by the successful
enhancement response.

## `409 Conflict`

This ad response has already been acknowledged. Each `ad_response_id` can only
be acknowledged once.

Treat this as a duplicate submission issue in your integration.

## `5xx`

A server-side failure occurred while processing acknowledgment. The outcome is
unknown, which makes this status more sensitive than a normal retry scenario.

Stop Adstract services until the issue is resolved. Earlier successful traffic
remains unaffected, but you should not continue sending new acknowledgment
traffic blindly.

## Recommended handling

- `200` or `201`: treat as successful acknowledgment.
- `400`, `401`, `403`, `404`, `409`: treat as integration or state issues and investigate.
- `5xx`: stop Adstract traffic and resolve the issue before continuing.

## Next steps

- [Ad Acknowledgment](/api-reference/ad-acknowledgment)
- [Ad Injection](/api-reference/ad-injection)
- [Enhancement Status Codes](/api-reference/enhancement-status-codes)
- [Authentication](/api-reference/api-authentication)
