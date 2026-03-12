---
title: API Keys
description: Overview of the two API key types available to Publishers — Sandbox and Billing.
---

Adstract uses two types of API keys for Publisher accounts.
The type available to you depends on your verification status.

## Key types

### Sandbox Key

Available **before** verification. Used to integrate the SDK, test your setup,
and generate the traffic required for verification eligibility.

Traffic from Sandbox keys is **never paid**.

See [Sandbox Key](/sandbox-key) for full creation and usage instructions.

### Billing Key

Available **only after** verification is approved. All valid traffic generated
with a Billing key is eligible for payment.

See [Billing Key](/billing-key) for full creation and usage instructions.

## Summary

| | Sandbox Key | Billing Key |
|---|---|---|
| Available before verification | Yes | No |
| Traffic is paid | No | Yes |
| Purpose | Integration and traffic proof | Production revenue |

## Revoking an API key

To revoke any key type:

1. Go to the `API Keys` section of the platform.
2. Find the key item.
3. Click `Revoke` in the far-right action column.

## Security note

- API keys are shown in full only once at creation time.
- Store keys securely immediately after creation.

## Next steps

- If you are pre-verification, see [Sandbox Key](/sandbox-key).
- If you are post-verification, see [Billing Key](/billing-key).
