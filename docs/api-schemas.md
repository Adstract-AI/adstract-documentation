---
title: API Schemas
description: Request and response schema reference for ad injection.
---

## Request schema

### Root fields

- `prompt` (`string`, required): minimum length is 5.
- `wrapping_type` (`string`, optional): `xml` or `plain`, defaults to `xml`.
- `conversation` (`object`, required): includes conversation identifiers.
- `metadata` (`object`, optional): client/geo metadata.
- `constraints` (`object`, optional): ad selection constraints.

### `conversation`

- `conversation_id` (`string`, required, non-empty)
- `session_id` (`string`, required, non-empty)
- `message_id` (`string`, required, non-empty)

### `metadata`

If `metadata` is sent, it must include at least one of `geo` or `client`.

#### `metadata.geo`

- `geo_country` (`string`, optional): uppercase ISO country code (for example `US`, `DE`).
- `geo_region` (`string`, optional)
- `city` (`string`, optional)
- `asn` (`integer`, optional, must be `>= 0`)
- `network_type` (`string`, optional)
- `proxy_vpn_detection` (`boolean`, optional)
- `language` (`string`, optional): lowercase ISO language code (for example `en`, `de`).

#### `metadata.client`

- `ip_hash` (`string`, optional)
- `os_family` (`string`, optional): one of `windows`, `macos`, `linux`, `android`, `ios`, `chromeos`, `unix`, `other`.
- `device_type` (`string`, optional): one of `desktop`, `mobile`, `tablet`, `bot`, `unknown`, `email_client`.
- `referrer` (`string`, optional)
- `x_forwarded_for` (`string`, optional)
- `user_agent_hash` (`string`, optional)
- `browser_family` (`string`, optional)
- `sdk_version` (`string`, optional): semantic version format (`X.Y.Z`).

### `constraints`

- `max_ads` (`integer`, optional): must be between `1` and `20`.
- `min_similarity_hint` (`number`, optional): range `0.0` to `1.0`.
- `max_latency_ms_hint` (`integer`, optional): must be `>= 0`.
- `safe_mode` (`string`, optional): one of `strict`, `standard`, `off`.

## Response schema

- `ad_request_id` (`uuid`)
- `ad_response_id` (`uuid`)
- `success` (`boolean`)
- `execution_time_ms` (`number`)
- `aepi` (`object | null`)
- `tracking_url` (`string | null`)
- `product_name` (`string | null`)
- `sponsored_label` (`string | null`)
- `tracking_identifier` (`string | null`)

### `aepi`

- `status` (`string`)
- `aepi_text` (`string`)
- `checksum` (`string`)
- `size_bytes` (`integer`)

## Minimal valid request

```json
{
  "prompt": "How can I improve retention?",
  "conversation": {
    "conversation_id": "conv-1",
    "session_id": "sess-1",
    "message_id": "msg_u_1"
  }
}
```
