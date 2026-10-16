<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Web3Forms intake integration

- The case-review form uses the native browser POST flow to `https://api.web3forms.com/submit`; do not move it to a server-side relay while using the Web3Forms Free plan.
- Configure `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in local ignored environment files and the hosting provider's Production environment. The Web3Forms access key is public by provider design, but the real value must never be committed or printed.
- The form redirects to `/thank-you` after a successful submission and retains browser validation, consent, and the `botcheck` honeypot.
- Web3Forms Free hCaptcha uses the zero-config integration: keep the `h-captcha` container and `https://web3forms.com/client/script.js`; do not add a custom hCaptcha key. hCaptcha must also be enabled for the form in the Web3Forms dashboard.
- Do not test this integration with server-side `curl`, API routes, or Vercel functions; Web3Forms Free rejects those requests with HTTP 403. Test from a normal browser using synthetic data.
- Production changes require explicit user approval. The live integration was deployed through commit `cc20fce` after local TypeScript, ESLint, production-build, and diff checks passed.
