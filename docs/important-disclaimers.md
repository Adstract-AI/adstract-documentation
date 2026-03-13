---
title: Important and Disclaimers
description: Critical integration notes for reporting, privacy, and payout flow.
---

This page covers critical notes that should be understood before production use.

## Acknowledgment is required for full cycle completion

- `acknowledge` and `acknowledge_async` are not optional for complete production integration.
- They finalize the ad workflow cycle after the model response is produced.
- This confirmation step is part of how publisher ad-placement opportunity is
  accounted for.

## Privacy and data-protection model

- The final model response text is sent to the Adstract backend as part of the
  acknowledgment flow for compliance verification.
- Adstract uses this text to verify that ad content was delivered correctly and
  that reporting integrity is maintained.
- Derived metrics and tracking metadata are also collected as part of this flow.

## Operational recommendation

- Always call `acknowledge` or `acknowledge_async` after
  receiving final model output when enhancement succeeded.
- Treat acknowledgment as a required production path, not a debug-only step.

## Compliance and enforcement

- Adstract continuously monitors platform behavior and reporting integrity.
- False reporting is treated as a severe violation.
- Violations include cases such as reporting ad placement and then
  programmatically removing ad content from the final response.
- Severe violations can result in account/platform bans and legal action.

## Terms and conditions

For full policy details, see our Terms and Conditions:

- [Terms and Conditions](/terms-of-condition)