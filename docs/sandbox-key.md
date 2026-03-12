---
title: Sandbox Key
description: Create and use a Sandbox API key to generate traffic and meet the verification eligibility requirements.
---

A **Sandbox API key** is the only type of API key available to Publisher accounts
before verification is approved.

Sandbox keys are used to integrate and test the Adstract SDK, generate real traffic,
and demonstrate eligibility before requesting verification.

## Important: Sandbox traffic is not paid

Traffic generated with a Sandbox key is **never eligible for payment**. Sandbox keys
exist solely to prove your platform's integration quality and traffic capacity.
After verification, you will create a [Billing Key](/billing-key) for paid production traffic.

## Before you start

- You must have an active platform. See [Platform Creation](/platform-creation).

## How to create a Sandbox API key

1. In the `Platform` page, click the platform for which you want an API key.
2. Scroll down to the `API Keys` section.
3. Click `Create API Key`.
4. Fill in the API key creation form:
   - `Label`
   - `Description`
   - `Permission Type` — select **Sandbox**
5. Click `Create`.
6. In the next window, copy the API key immediately.
   - This is the last time the full key is shown for security reasons.
7. Confirm and close the key-created window.
8. The new key appears in the `API Keys` section list.

## Security note

- API keys are shown in full only once.
- Store the key securely after creation.

## Integrate the SDK with your Sandbox key

After creating your Sandbox key, integrate the SDK into your product workflows.
The Sandbox key is what you use during development and while building up traffic.
For integration instructions see [SDK Installation](/sdk-installation) and [Quickstart](/quickstart).

## Verification eligibility: 200 unique ad clicks

To be eligible for verification, you must generate **at least 200 unique ad clicks**
using your Sandbox key. This requirement demonstrates that your platform has a real,
functional integration and a user base capable of generating ad interactions.

- Adstract determines click eligibility based on internal criteria.
- You can track your generated clicks in the Publisher dashboard.
- There is no time limit for reaching this milestone, but the platform must remain active.

Once you reach 200 unique ad clicks, proceed to [Beneficiary Setup](/beneficiary) to
complete the remaining verification prerequisites.

## Revoking a Sandbox key

If you no longer want to use a Sandbox key:

1. Go to the `API Keys` section of the platform.
2. Find the key item.
3. Click `Revoke` in the far-right action column.

## Next steps

- After reaching 200 unique ad clicks, continue to [Beneficiary Setup](/beneficiary).
