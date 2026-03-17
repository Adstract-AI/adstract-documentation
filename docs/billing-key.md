---
title: Billing Key
description: Create a Billing API key after Publisher verification is approved to begin earning from production traffic.
---

A **Billing API key** is only available after your Publisher account has been
successfully verified. Traffic generated with a Billing key is eligible for payment.

## How Billing keys differ from Sandbox keys

| | Sandbox Key | Billing Key |
|---|---|---|
| Available before verification | Yes | No |
| Traffic is paid | No | Yes |
| Purpose | Integration testing and traffic proof | Production traffic and revenue |

## Before you start

- Your Publisher account must be verified. See [Verification](/verification).
- You must have an active platform. See [Platform Creation](/platform-creation).

## How to create a Billing API key

1. In the `Platform` page, click the platform for which you want an API key.
2. Scroll down to the `API Keys` section.
3. Click `Create API Key`.
4. Fill in the API key creation form:
   - `Label`
   - `Description`
   - `Permission Type` — select **Billing**
5. Click `Create`.
6. In the next window, copy the API key immediately.
   - This is the last time the full key is shown for security reasons.
7. Confirm and close the key-created window.
8. The new key appears in the `API Keys` section list.

## Security note

- API keys are shown in full only once.
- Store the key securely after creation.

## Production traffic

Replace any Sandbox key in your integration with your new Billing key.
From this point, all valid ad interactions generated through your platform
are eligible for payment according to Adstract's revenue terms.

## Revoking a Billing key

If you no longer want to use a Billing key:

1. Go to the `API Keys` section of the platform.
2. Find the key item.
3. Click `Revoke` in the far-right action column.

## Next steps

- Continue to [REST API Overview](/api-reference/rest-api-overview).
- Continue to [Initialize Your Integration](/initialize-integration).
- If you are already integrated with a Sandbox key, simply replace the key value
  in your configuration.
