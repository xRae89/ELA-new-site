# Team photo refresh

## Objective

Move the supplied team portraits into the public team-image directory, optimize them for web delivery, and connect every supplied portrait to the matching team member.

## Authorized scope

- Local feature branch: `feat/web3forms-intake`
- Source photos: `public/images/team/Team photos/`
- Destination: `public/images/team/`
- Preserve the existing public URL convention: lowercase kebab-case `.webp` filenames.
- Do not push or deploy without explicit user approval.
- Remove the redundant nested source folder after verification; the supplied PNGs are not shipped.

## Tasks

- [x] ODD-PHOTO-1 Convert the supplied PNG portraits to optimized WebP files in the destination directory.
- [x] ODD-PHOTO-2 Update team data for newly supplied members without changing roles or names.
- [x] ODD-PHOTO-3 Remove the redundant source folder only after destination files and mappings are verified.
- [x] ODD-PHOTO-4 Run image and application checks, inspect file sizes, and record verification evidence.

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
