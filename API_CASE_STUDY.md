# API developer-platform case draft

The dedicated case lives at `/projects/renewable-energy-api` on `feat/api-platform-case-study`. It is not yet merged: additional EU Data Act material is expected before finalizing the main narrative.

## Content scope

The owner confirmed European delivery, online debugging and application management as personal responsibilities. Current EU Data Act work is still in development and has not launched. The case retains the owner-specified React / TypeScript stack. Architecture descriptions explain the platform rather than claiming ownership of every subsystem.

The provided architecture guide supports five configured business sites, user-level V1 and OAuth2 V2 documentation paths, site-aware gateway selection, application permission checks, raw debugging responses and distinct portal/debugger request contracts. These are platform characteristics, not adoption or performance metrics.

## Interactive reconstruction

`components/api-platform-demo.tsx` is an entirely local simulation. It uses synthetic application IDs, sample endpoints and invented energy figures inside the documented `result_code` / `result_data` response envelope. No real API calls, credentials, encryption, internal source screenshots or internal network addresses are included.

Visitors can change sites, switch the sample interface between English and Chinese, select two sample endpoints, encounter a missing permission and simulate a timeout. Recovery requires an explicit action. Changing any input cancels the pending run and clears stale results; unmounting clears timers. Mobile request/retry actions reveal the request trace and honor reduced-motion preferences.

## Next content pass

Use the forthcoming Data Act documents to identify the principal business workflow, concrete frontend constraints and the owner's technical decisions. Keep unreleased work separate from delivered platform capabilities, and clarify its relationship to the existing Data Export Center case before merging.
