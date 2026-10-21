# Team photo refresh

## Objective

Move the supplied team portraits into the public team-image directory, optimize them for web delivery, and connect every supplied portrait to the matching team member.

## Authorized scope

- Local feature branch: `feat/web3forms-intake`
- Source photos: supplied PNG files in `public/images/team/`
- Destination: `public/images/team/`
- Preserve the existing public URL convention: lowercase kebab-case `.webp` filenames.
- Do not push or deploy without explicit user approval.
- Remove the redundant nested source folder after verification; the supplied PNGs are not shipped.

## Tasks

- [x] ODD-PHOTO-1 Convert the supplied PNG portraits to optimized WebP files in the destination directory.
- [x] ODD-PHOTO-2 Update team data for newly supplied members without changing roles or names.
- [x] ODD-PHOTO-3 Remove the redundant source folder only after destination files and mappings are verified.
- [x] ODD-PHOTO-4 Run image and application checks, inspect file sizes, and record verification evidence.
- [x] ODD-PHOTO-5 Convert the four newly supplied PNG portraits to optimized WebP files and connect them to the matching team members.

## Acceptance criteria

- All 10 supplied portraits are available at `public/images/team/<first-last>.webp`.
- Each supplied portrait is no larger than the source and target web delivery is materially smaller than approximately 2 MB per PNG.
- Existing team URLs remain stable for the eight replaced portraits.
- Aaron Miller and George Goulian are mapped to their new portraits.
- No unrelated content or deployment configuration changes.

## Completion evidence

- Conversion: `cwebp` 1.6.0, lossy quality 82, metadata stripped.
- Dimensions: square source portraits were resized to 800x800; the two 1122x1402 portraits were resized to 640x800 to preserve aspect ratio.
- Destination validation: all 10 files passed `file` as Web/P images and are present in `public/images/team/`.
- Destination sizes (`stat`, exact bytes): Aaron 25,102; Daniel 26,604; Derek 30,842; Dominick 29,478; George Goulian 30,878; George Rasalan 22,862; Hamid 28,076; Julio 23,620; Kasim 29,928; Leslie 38,806.
- Source comparison: each optimized destination is materially smaller than its approximately 2.0–2.2 MB PNG source.
- Application checks: `npx tsc --noEmit`, `npx eslint .`, `npm run build`, and `git diff --check` completed successfully.
- Limitation: image visual content was not printed or exposed; validation was limited to file type, dimensions, file size, and application checks.

## ODD-PHOTO-5 completion evidence

- Conversion: `cwebp` 1.6.0, lossy quality 82, metadata stripped.
- Dimensions: Arianna Malo was resized from 1086x1448 to 600x800; Maria Romo, Priscila Olivas, and Rober Hernandez were resized from 1122x1402 to 640x800, preserving aspect ratios.
- Destination validation: all four files passed `file` as Web/P images and `webpinfo` reported valid lossy VP8 data with no errors.
- Destination sizes (`stat`, exact bytes): Arianna 29,262; Maria 37,556; Priscila 46,364; Rober 28,246.
- Source comparison (`stat`, exact bytes): Arianna 2,283,913; Maria 2,360,800; Priscila 2,482,103; Rober 2,144,535. Every destination is smaller than its source.
- Mapping validation: `lib/people.ts` now maps each matching member to the corresponding lowercase kebab-case WebP URL without changing names, roles, or groups.
- Source cleanup: the four supplied PNG files were removed after destination validation; no unrelated files were deleted.
- Application checks: `npx tsc --noEmit`, `npx eslint .`, `npm run build`, and `git diff --check` completed successfully.

## Current continuation

- Authorized by the user to process the four new PNG portraits currently in `public/images/team/`.
- No push, deploy, or remote mutation is authorized.
- Route: delegated direct writer; implementation spans image assets and team data, so the writer must inspect the existing mapping before editing.
