# Employment Law Assist: new website

Rebuild of employmentlawassist.com in Next.js 16 (App Router) + Tailwind CSS 4, with an AI chat assistant
(Claude), a case-review intake form, all 50 pages of the old WordPress site, and redirects for old URLs that moved.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in values (all optional for a first run)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

Requires Node 20.9+ (built on Node 25). Check before changing anything: `npx tsc --noEmit && npx eslint .`

> Next.js 16 differs from older versions. Docs for the installed version live in `node_modules/next/dist/docs/`.

## Deploy to Vercel (recommended)

1. Go to vercel.com > **Add New > Project** > import this GitHub repo. Framework is auto-detected (Next.js).
   No build settings need changing.
2. Under **Environment Variables**, add the values below, for **Production** and **Preview**.
3. Click **Deploy**. Every push to `main` then deploys automatically; other branches get preview URLs.
4. **Domain:** Project > Settings > Domains > add `employmentlawassist.com` and `www`, then update DNS at the
   registrar as Vercel instructs. Do this only when the firm approves the site, because it replaces the live WordPress site.

CLI alternative: `npm i -g vercel && vercel` (preview) / `vercel --prod` (production).

### Environment variables

| Variable | Required | What it does |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | **Yes, before launch** | Public Web3Forms Free access key used by the browser-side case-review form. Add it to the ignored `.env.local` file or the Vercel environment settings. **Without it, submissions are disabled and the form shows a phone fallback.** |
| `ANTHROPIC_API_KEY` | For live chat | Key from console.anthropic.com. Without it the chat answers from canned replies in `lib/chat.ts`. Chat usage bills to this key. |
| `CHAT_MODEL` | No | Overrides the chat model (default `claude-opus-5-5`). A cheaper model such as `claude-sonnet-5-5` lowers cost. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Production URL for canonical links and `sitemap.xml`. Defaults to `https://employmentlawassist.com`. |

Preview deployments automatically send `Disallow: /` in `robots.txt`; production allows indexing.

## Before going live: checklist

- [ ] Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` and submit a test case review end to end. Confirm the message arrives in the Web3Forms destination inbox.
- [ ] In the Web3Forms dashboard, enable hCaptcha for this form. Web3Forms Free provides a zero-config hCaptcha flow; no custom hCaptcha key is needed.
- [ ] Set `ANTHROPIC_API_KEY` (the firm's own key) and test the chat. Consider a spend limit in the Anthropic console.
- [ ] Firm reviews all copy. Page text was rewritten from the old site's facts; the **privacy policy and terms are drafts** and need legal review.
- [ ] Confirm the review quotes are approved for use.
- [ ] Add headshots for the 9 team members currently shown as initials (`lib/people.ts`, images in `public/images/team/`).
- [ ] Confirm phone, address, email, hours in `lib/site.ts`.
- [ ] Point the domain to Vercel (see above). Old WordPress URLs are already redirected (`next.config.ts`).
- [ ] Submit `https://employmentlawassist.com/sitemap.xml` in Google Search Console.

## Editing content

All text lives in typed data files in `lib/`, not in the page components:

| File | Contents |
|---|---|
| `site.ts` | Firm name, phone, email, address, map links, promises |
| `practice-areas.ts` | The 5 practice-area pages |
| `regions.ts` | 6 regions x 3 topics = 18 location pages (URLs match the old site) |
| `faq.ts` | FAQ groups and the homepage FAQ picks |
| `people.ts` | Team members and client review excerpts |
| `careers.ts` | Open roles and culture blurbs |
| `posts.ts` | Blog posts |
| `chat.ts` | AI assistant instructions and offline answers |

Images are in `public/images/`. Colors and animation are defined in `app/globals.css` (`@theme` block).

## Structure

```
app/
  page.tsx                 homepage
  [slug]/page.tsx          practice areas + 18 location pages (old WordPress URLs)
  about, our-team, faq, reviews, contact-us, blog/, careers/, privacy-policy, terms-and-conditions
  api/chat/route.ts        streams AI replies (rate-limited per visitor)
  sitemap.ts, robots.ts
components/                UI, header/footer, chat widget, motion helpers (Reveal, Parallax, Marquee)
lib/                       content data (above)
next.config.ts             redirects from old WordPress URLs
```

## Notes

- The chat assistant is instructed not to give legal advice, quote case values, or collect sensitive data, and it
  points visitors to the phone line and case-review form. Review `lib/chat.ts` if the firm wants different rules.
- All animation respects the visitor's reduced-motion setting.
- Images (office, attorneys, logo, badges) came from the firm's existing website.
- The case-review form uses a native browser POST to Web3Forms Free and redirects to `/thank-you` after submission. Its public access key belongs in ignored local environment configuration or the deployment provider's environment settings; never commit a real key. Provider errors use Web3Forms' native redirect rather than in-page JSON handling.
- The case-review form includes Web3Forms' zero-config hCaptcha. Enable hCaptcha in the Web3Forms dashboard; do not add a custom hCaptcha key.
