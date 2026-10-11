# Energy API and Data Act cases

`/projects/renewable-energy-api` presents the developer-platform work; `/projects/data-export-center` presents the associated data-access and export workflow. Both pages link to each other.

## Content scope

The owner confirmed European delivery, online debugging and application management as personal responsibilities, with EU Data Act data access as the principal focus. The cases retain the owner-specified React / TypeScript stack. Portfolio copy omits development and release-status labels at the owner's request. It does not assert a launch or verified legal compliance.

Architecture descriptions explain the platform rather than claiming ownership of every subsystem. The supplied architecture guide supports regional gateways, application permission checks and distinct portal/debugger response contracts. The Data Act system design supplies workflow context for scope validation, asynchronous preparation, partial results, shared browser entry points and separate task/identity/download lifecycles. Public copy summarizes these frontend concerns without reproducing internal thresholds, delivery schedules or source images.

## API reconstruction

`components/api-platform-demo.tsx` uses synthetic application IDs, sample endpoints and invented energy figures inside the documented response envelope. It supports five sites, two endpoints, English/Chinese, permission rejection and explicit timeout recovery. Input changes cancel stale work. No API calls, real credentials or encryption occur.

## Export reconstruction

`components/data-export-demo.tsx` simulates scope selection, request confirmation, asynchronous preparation and download confirmation. It includes a configurable sample outcome, a deliberately fictional 12 MB limit, partial records, failure recovery, link expiration and task expiration. Scope changes and reset cancel pending work. A link can be renewed without rerunning a ready task; an expired task needs a new confirmed request.

Downloads are small local CSV/JSON files containing synthetic, read-only records with units and timezone-aware timestamps. Missing records use `null`; JSON includes scope and missing-data metadata. The demo does not reproduce the production archive, identity service or download infrastructure. All service-side authentication and authorization remain server responsibilities. Mobile actions bring the result into view and honor reduced motion.
