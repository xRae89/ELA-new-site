# Paulina Pola team portrait

## Objective

Optimize `Paulina-Pola.png` for web delivery and connect it to Paulina Pola's existing team record.

## Authorized scope

- Modify only the Paulina portrait asset and its existing team mapping.
- Preserve the existing lowercase kebab-case WebP URL convention.
- Do not modify unrelated team members or site content.
- Do not push, deploy, or change production without explicit approval.

## Tasks

- [x] ODD-PAULINA-1 Convert the supplied PNG to an optimized WebP in `public/images/team/`.
- [x] ODD-PAULINA-2 Connect Paulina Pola to the optimized WebP without changing her name, role, or group.
- [x] ODD-PAULINA-3 Validate dimensions, file type, size, mapping, TypeScript, lint, build, and diff hygiene.

## Acceptance criteria

- `public/images/team/paulina-pola.webp` exists as a valid WebP and is materially smaller than the PNG source.
- Paulina Pola maps to `/images/team/paulina-pola.webp`.
- No unrelated files are changed.
- No push or deployment occurs.

## Progress

- Route: delegated direct writer; the asset conversion and team mapping are one focused work unit.
- Source image: `public/images/team/Paulina-Pola.png` (1122x1402 PNG).

## Evidence

- Converted with `cwebp -q 82 -m 6 -metadata none`.
- `public/images/team/paulina-pola.webp` is a valid 1122x1402 WebP; the 1122:1402 aspect ratio is preserved.
- Source size: 2,159,431 bytes; WebP size: 53,544 bytes (97.5% smaller).
- Paulina Pola remains `Paralegal` in `Case team` and now maps to `/images/team/paulina-pola.webp`.
- Validation completed: `npx tsc --noEmit`, `npx eslint .`, `npm run build`, and `git diff --check`.
- Scope check confirmed changes are limited to this task document, `lib/people.ts`, and the optimized WebP; no push or deployment was performed.
