---
title: Get API Key
description: Step-by-step process to get an Adstract API key as a Publisher.
---

This page explains the full process for creating and managing an Adstract API key.
API key access is tied to a **Publisher** account and a created platform.

## Before you start

Complete all prerequisites first:

- [Signup](/signup) as `Publisher`.
- Complete [Verification](/verification) (administrator approval).
- Complete [Platform Creation](/platform-creation) so you have a platform.

Platform entry point: [adstract.ai](https://adstract.ai/).

## API key onboarding flow

1. In the `Platform` page, click the platform for which you want an API key.
2. Scroll down to the `API Keys` section.
3. Click `Create API Key`.
4. Fill the API key creation form:
   - `Label`
   - `Description`
   - `Permission Type`
5. Click `Create`.
6. In the next window, copy the API key immediately.
   - This is the last time the full key is shown for security reasons.
7. Confirm and close the key-created window.
8. The new key appears in the `API Keys` section list.

## Security note

- API keys are shown in full only once.
- Store the key securely after creation.

## Revoke an API key

If you no longer want to use an API key:

1. Go to the `API Keys` section of the platform.
2. Find the key item.
3. Click `Revoke` in the far-right action column.

This is the standard successful flow for API key creation and lifecycle management.

## You are ready for code integration

You now have everything required to start setting up the actual SDK integration
code in your application.

## Next steps

- Continue to [Adstract Client](/client).
- In that page, review the dedicated constructor section for a detailed
  explanation of every `Adstract` initialization parameter and how to choose
  values for your environment.
