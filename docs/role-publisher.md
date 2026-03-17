---
title: Publisher Role
description: Definition and intended usage for the Adstract Publisher role.
---

The `Publisher` role is the primary role for current Adstract integration onboarding.

## What it means

A Publisher owns or operates ad inventory opportunities where sponsored content
can be placed in LLM-powered experiences.

Examples:

- conversational AI applications;
- assistants;
- prompt-based workflows; and
- any product where prompts are sent to an LLM.

## Why this role matters

Publisher is the role used in the current API key acquisition flow.

If you want to integrate Adstract, choose `Publisher` during signup.

## Publisher onboarding journey

The Publisher path from signup to paid production traffic is:

1. **Sign up** as Publisher and create a platform. See [Platform Creation](/platform-creation).
2. **Create a Sandbox key**. See [Sandbox Key](/sandbox-key).
3. **Integrate Adstract** using the Sandbox key. See [Quickstart](/quickstart).
4. **Generate 200 unique ad clicks** (traffic is not paid at this stage).
5. **Set up a beneficiary** (payment details). See [Beneficiary Setup](/beneficiary).
6. **Request verification** — Adstract reviews and approves. See [Verification](/verification).
7. **Create a Billing key** after approval and swap it in for paid production traffic. See [Billing Key](/billing-key).

## Responsibilities

- Integrate Adstract into your prompt flow.
- Provide required client/session metadata.
- Use enhancement and acknowledgment methods according to documentation.
