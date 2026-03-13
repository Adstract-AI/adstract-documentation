---
title: Overview
description: High-level overview of Adstract and how it fits into LLM-powered products.
---

Adstract helps teams add sponsored content workflows to LLM-powered products.
It is designed for prompt-driven experiences where ads can be inserted and
tracked in a structured way.

## What Adstract provides

At a high level, Adstract enables:

- ad-enabled prompt workflows for LLM experiences;
- a platform model for publishers and inventory ownership;
- account and platform lifecycle management; and
- API key based access control for integration environments.

## Integration options

Adstract can be integrated in two ways:

- **REST API** — send HTTP requests directly to `api.adstract.ai`. No SDK
  required. Use any language or HTTP client.
- **Python SDK** — typed client with built-in validation, retries, and sync/async
  support. The fastest path to integration in Python applications.

## Typical lifecycle

The standard Publisher onboarding lifecycle is:

1. Sign up as a Publisher.
2. Create a platform and ensure it is active.
3. Create a **Sandbox** API key.
4. Integrate the SDK into your product workflows using the Sandbox key.
5. Reach 200 unique ad clicks (traffic is not paid at this stage).
6. Complete your profile by providing a valid beneficiary (payment details).
7. Request verification — Adstract reviews and approves your account.
8. After approval, create a **Billing** API key and swap it in for paid production traffic.

## Who this is for

Adstract is intended for teams building:

- conversational AI applications;
- assistants and copilots;
- vertical LLM applications; and
- generalized AI platforms.

## Next steps

- Continue to [Introduction](/introduction) for platform context and SDK architecture.
- Continue to [Adstract Hub](/adstract-hub) to experience the platform without any implementation.
