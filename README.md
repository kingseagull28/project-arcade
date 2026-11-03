# Project Arcade � Version 1

Independent React / TypeScript / Vite / Tailwind application. Requires Node 22.12+ and npm. All records and artwork are illustrative. Bundled demos are deliberately small; they are not your existing GitHub games.

## Run

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Open the address printed by Vite. Hash detail routes support direct links and browser back/forward. Search matches titles, descriptions and tags; filters combine. No database, GitHub API, automatic AI service or browser-side metadata editor is implied. Edit the JSON file and commit to update metadata.

## Catalog maintenance

Edit `src/catalog.json`; duplicate an existing record and use a unique id and slug. Schemas live in `src/model.ts` and reject unknown fields. Build runs validation, tests, type checking and an artifact check. Put approved images under `public/covers`; local asset paths are root-relative. Replace sample covers with real screenshots you own. HTTPS launch URLs are supported; root-relative paths support the bundled demos. Avoid personal data in descriptions, URLs, query strings and images. Never store credentials in either catalog or any VITE_ variable.

Every record requires approved:true. This is an explicit reviewed catalog, not an export of Vault metadata. Do not copy the Vault catalog here. Add only a manually reviewed title, descriptions, category, tags, public artwork, instructions, approved play URL, featured flag, id and slug. The schema rejects private fields; the build also scans output for known private sample markers. Scanning is defense in depth, not proof that arbitrary prose/images contain no sensitive data. The UI spotlights the first record marked featured; if none are marked, it uses the first record.

## GitHub and deployment

Follow `SETUP.md` in the delivery bundle before publishing. Copy ONLY this folder's contents into its own repository (Vault private). Do not push the whole delivery bundle into a public repo. The included GitHub Actions workflow validates pushes and pull requests; deployment is configured separately in Cloudflare. No account integration, domain, deployment or authentication has been configured or verified by this delivery.

## Recovery

Keep an encrypted independent backup of the private repository. Tag known good releases. Restore a local checkout with `git checkout <tag>`; run `npm ci` and `npm run build`, review, then restore through a new branch/PR. Revert a bad catalog commit with `git revert <commit>` and redeploy after review. Keep Access policies intact during rollback. Git backups do not preserve Cloudflare settings: separately retain an encrypted record of hostnames, Access policies and deployment configuration.

