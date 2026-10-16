# Web3Forms intake integration

## Objective

Connect the existing case-review intake flow to Web3Forms Free through its authorized native HTML form flow without committing the access key or changing production.

## Problem

The previous client flow used `fetch()` and handled Web3Forms JSON responses in React. The approved Free integration uses a regular browser POST to Web3Forms' submit endpoint with an `access_key` field and a provider redirect.

## Authorized scope

- Local feature branch: `feat/web3forms-intake`
- Modify only the intake integration and supporting local configuration guidance.
- Do not push, deploy, change `main`, or modify production settings without explicit user approval.
- Web3Forms Free requires browser-side submission; its access key is public by provider design but must remain in ignored environment configuration, never committed or displayed.

## Tasks

- [x] ODD-1 Update the client intake flow to submit the validated payload to Web3Forms Free through a native HTML browser POST.
- [x] ODD-2 Add safe environment configuration guidance without adding the access key to tracked files.
- [x] ODD-3 Remove the unused server-side intake relay so the production path is unambiguous.
- [x] ODD-4 Run lint/type/build checks and verify the working tree contains no secret material.
- [x] ODD-5 Add Web3Forms Free's zero-config hCaptcha container and client script, while preserving native submission when a token is present.
- [ ] ODD-6 Enable hCaptcha for the form in the Web3Forms dashboard before launch; no custom hCaptcha key is required.

## Acceptance criteria

- Valid submissions reach Web3Forms using a native form POST to `https://api.web3forms.com/submit` and the browser-side public access key configured through an ignored environment file.
- Existing consent, honeypot, styling, and `/thank-you` success destination remain intact; browser constraints replace the former React validation.
- Provider errors are handled by Web3Forms/native redirect rather than in-page JSON errors.
- The form blocks native submission with an accessible inline error when `h-captcha-response` is missing, and submits natively when the token exists.
- Web3Forms' client script is loaded with Next.js `Script`; hCaptcha is enabled in the Web3Forms dashboard using the Free zero-config flow without a custom hCaptcha key.
- The access key is absent from tracked files, diffs, logs, and final output.
- No push or deployment occurs without explicit approval.
- No live submission is performed during local verification.

## Progress

- Branch created from clean `main` at `90b1d87`.
- User approved the Web3Forms Free browser-side path.
- Native HTML implementation completed locally; validation evidence recorded below.

## Verification evidence

- `npm ci`: passed; installed dependencies locally. npm reported 5 high-severity audit findings requiring separate dependency review.
- `npx eslint .`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- `npx tsc --noEmit`: passed after the production build generated the current Next.js types; no changed Web3Forms file was implicated.
- Secret safety: passed; `.env.local` is ignored, no environment file is tracked, and no real key appears in the tracked diff.
- No live submission was performed, so inbox delivery remains pending a user-approved test submission.
- hCaptcha implementation is present locally; dashboard activation remains a required pre-launch step.

## Route evidence

- Route: delegated direct writer, because implementation spans the API route and configuration guidance.
- Review boundary: one focused work-unit commit after validation.
