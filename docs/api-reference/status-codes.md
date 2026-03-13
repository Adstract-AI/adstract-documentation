---
title: Status Codes
description: Complete reference for every HTTP status code returned by the Adstract API, including causes and recommended handling.
---

Every response from the Adstract API carries an HTTP status code. This page
covers each code in detail — what triggers it and how to handle it correctly.

---

## Ad Injection

### Quick reference

| Code | Name | Category | Meaning |
|---|---|---|---|
| `200` | OK | Success | Ad injected — use `enhanced_prompt` |
| `201` | Created | Success | Request logged but prompt rejected — use original prompt |
| `202` | Accepted | Success | Request valid but no ad available — use original prompt |
| `400` | Bad Request | Client error | API key format is invalid |
| `401` | Unauthorized | Client error | API key is valid format but no platform is registered to it |
| `403` | Forbidden | Client error | Platform or publisher account is not active |
| `422` | Unprocessable Entity | Client error | Request body failed validation |
| `429` | Too Many Requests | Client error | Rate limit exceeded |
| `5xx` | Server Error | Server error | Internal error — retry with backoff |

---

### `200 OK`

The prompt was analysed, an ad was matched, and the prompt was enhanced
successfully. `success` is `true`, `enhanced_prompt` and `product_name` are
populated.

**Required next step:** call the acknowledgment endpoint after your LLM
responds. Skipping acknowledgment on a `200` breaks the ad cycle.

---

### `201 Created`

The request was received and an entry was created, but the prompt was not
considered suitable for ad injection. No ad was embedded. `success` is `false`,
`enhanced_prompt` and `product_name` are `null`. Fall back to the original
prompt. No acknowledgment call is needed.

**Common cause:** the prompt covers a sensitive or unadvertisable subject matter. Adstract does not inject ads into prompts of this nature.

---

### `202 Accepted`

The request was valid and accepted, but no suitable ad inventory was available
for this specific opportunity at this time. No ad was embedded. `success` is
`false`, `enhanced_prompt` and `product_name` are `null`. Fall back to the
original prompt. No acknowledgment call is needed.

**Common causes:**
- No active advertisers are targeting this category or audience right now.
- Inventory was exhausted for the current time window.
- The request context did not match any running campaigns.

---

### `400 Bad Request`

The value supplied in the `X-Adstract-API-Key` header is not in a valid API key
format. The server rejected the request before attempting any lookup.

**Causes:**
- The header value is malformed (wrong length, invalid characters, etc.).
- The header value is a placeholder such as `your-api-key` or an empty string.

**Fix:** ensure you are sending a correctly formatted API key. See
[Authentication](/api-reference/api-authentication) for the expected format.

---

### `401 Unauthorized`

The `X-Adstract-API-Key` header is present and correctly formatted, but no
platform is registered to that key. The key does not exist in the Adstract
system.

**Causes:**
- The key was copied incorrectly.
- The key belongs to a different environment.
- The key was never created or was already deleted.

**Fix:** verify the key in the Adstract Platform under **API Keys**.

---

### `403 Forbidden`

The API key is valid and maps to an existing platform, but the request is not
permitted due to an account or platform state issue.

This code covers two distinct situations:

#### Platform or publisher is not active

The platform or publisher account associated with the key is not in an active
state. Any non-active state triggers this response:

| State | Example |
|---|---|
| Platform paused | Publisher temporarily paused the platform |
| Platform deleted | Platform was removed from the account |
| Publisher suspended | Publisher account was suspended by Adstract |
| Publisher deleted | Publisher account was deleted |
| Key revoked | The specific API key was revoked |

**Fix:** check the platform and publisher account status in the Adstract
Platform dashboard. A suspended or deleted account must be reviewed with
Adstract support.

#### Unverified publisher using a billing key

A billing-type API key was used from a publisher account that has not completed
identity and payment verification. Billing keys require a verified publisher to
operate.

**Fix:** complete the publisher verification flow. See
[Verification](/verification) for the required steps. Until verification is
complete, use a sandbox key for testing.

---

### `422 Unprocessable Entity`

The request body was received and parsed but failed field-level validation. One
or more required fields are missing or contain invalid values.

**Common causes:**
- `prompt` or `request_context` fields are missing.
- `request_context.session_id`, `user_agent`, or `user_ip` are absent.
- A field contains a value of the wrong type.

**Fix:** refer to the [Request Body](/api-reference/api-request) reference and
verify all required fields are present and correctly typed.

---

### `429 Too Many Requests`

Your integration has exceeded the request rate limit for the current time
window.

**Fix:** implement exponential backoff and retry logic. Do not retry immediately
on `429` — wait for the period indicated in the `Retry-After` response header, or back off with increasing delays.

---

### `5xx`

An unexpected error occurred on the Adstract server side. These are not caused
by your request.

**Fix:** retry with exponential backoff. If `5xx` responses persist, check the
Adstract status page or contact support.

---

### Handling all codes

The recommended pattern is to treat any non-`200` response as a fallback to
the original prompt, and only surface `400`, `401`, and `403` as hard errors
worth logging or alerting on:

```js
const response = await fetch("https://api.adstract.ai/ad-injection/start/", {
  method: "POST",
  headers: {
    "X-Adstract-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ prompt, request_context }),
});

if (response.status === 200) {
  const data = await response.json();
  return data.enhanced_prompt;
}

if (response.status === 400 || response.status === 401 || response.status === 403) {
  throw new Error(`Adstract configuration error: ${response.status}`);
}

return prompt;
```

---

## Ad Acknowledgment

### Quick reference

| Code | Name | Category | Meaning |
|---|---|---|---|
| `200` | OK | Success | Acknowledgment fully processed — ad cycle complete |
| `201` | Created | Success | Acknowledgment logged, publisher will be credited — minor post-processing issue on Adstract side, resolves automatically |
| `400` | Bad Request | Client error | API key format is invalid, or the ad response was not a successful injection |
| `401` | Unauthorized | Client error | API key is valid format but no platform is registered to it |
| `403` | Forbidden | Client error | Platform or publisher account is not active; or `ad_response_id` does not belong to this platform |
| `404` | Not Found | Client error | `ad_response_id` does not exist |
| `409` | Conflict | Client error | This ad response has already been acknowledged |
| `5xx` | Server Error | Server error | Outcome unknown — stop Adstract services immediately |

---

### `200 OK`

The acknowledgment was received and fully processed. The ad cycle is complete.

---

### `201 Created`

The acknowledgment was received and logged successfully — the publisher will be
credited. A non-critical post-processing step encountered an issue on the
Adstract side, but it will be resolved automatically. No action is required.

---

### `400 Bad Request`

Either the `X-Adstract-API-Key` header value is not in a valid format, or the
`ad_response_id` refers to an ad response that was not a successful injection
result. Only `200` injection responses can be acknowledged.

---

### `401 Unauthorized`

The `X-Adstract-API-Key` header is present and correctly formatted, but no
platform is registered to that key.

---

### `403 Forbidden`

The API key is valid but the request is forbidden. Covers two situations:
- The platform or publisher account associated with the key is not active.
- The `ad_response_id` does not belong to the platform associated with the API key.

---

### `404 Not Found`

The `ad_response_id` supplied in the request body does not exist in the Adstract
system. Verify the value was copied correctly from the injection response.

---

### `409 Conflict`

This ad response has already been acknowledged. Each `ad_response_id` can only
be acknowledged once. Duplicate calls are rejected.

---

### `5xx`

An unexpected server error occurred and the outcome of the acknowledgment is
unknown. **Stop Adstract services immediately** if this occurs. All prior
traffic is safe and unaffected. Contact Adstract support to resolve before
resuming.

---

## Related pages

- [Authentication](/api-reference/api-authentication) — API key types and the `X-Adstract-API-Key` header.
- [Response Body](/api-reference/api-response) — full field reference for success response payloads.
- [Ad Injection](/api-reference/ad-injection) — endpoint overview and integration flow.
- [Ad Acknowledgment](/api-reference/ad-acknowledgment) — closing the ad cycle and its own set of status codes.
