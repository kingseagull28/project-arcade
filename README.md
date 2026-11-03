# Project Arcade

A public React, TypeScript, Vite and Tailwind catalog. Workshop of Wonders is the featured real game; Pirate Adventure and Horse Racing are bundled sample demos.

## Run locally

Requires Node 22.12+ and npm. Run these commands in this repository folder:

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. Run `npm run build` to execute tests, type checking, the production build and the public artifact scan. Run `npm run preview` to serve that build locally. GitHub Actions validates pushes and pull requests.

## Catalog maintenance

Edit `src/catalog.json`. Add approved artwork under `public/covers/`. Every record requires a unique id and slug and `approved: true`. The strict schema is in `src/model.ts` and rejects unknown/private fields. Search covers titles, descriptions and tags; category filters combine with search. The first featured entry appears in the spotlight.

Review all public text, URLs and images. Never copy private Vault metadata or credentials here. The artifact audit catches known private markers; manual review is still necessary. Metadata changes are file edits reviewed through GitHub, not browser-side edits.

## Deployment

See [SETUP.md](SETUP.md). Cloudflare Pages settings: production branch `main`, repository root directory, build command `npm ci && npm run build`, output `dist`, and environment `NODE_VERSION=22`.

Saving files to GitHub does not deploy the Arcade. Verify the Cloudflare connection, build result and live URL separately. The linked Workshop of Wonders game keeps its existing GitHub Pages hosting; this catalog does not modify or move it.

## Publishing and recovery

Test and deploy each real game first. Add only approved public information to the Arcade, run the build, review and merge. Unlisting does not disable the original game website or erase previously public information.

Keep independent Git backups and tag stable releases. Revert a bad change through a reviewed commit and redeploy. Back up Cloudflare settings separately. The Vault belongs in a separate private repository.
