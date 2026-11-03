# Version 1 setup and release guide

Status: source delivered locally. GitHub repositories, Cloudflare projects, domains and Access policies have NOT been created or verified. The local Vault has no login. Use only sample data until the checks below pass.

## 1. Run locally

Install Node 22.12 or later. In each app directory, run `npm ci`, then `npm run dev`. To run both simultaneously use `npm run dev -- --port 5174` for the second app. Run `npm run build` to test, type check and build; `npm run preview` serves the production build. `dist/` is the hosting output. Do not open index.html directly from disk.

## 2. Create separate GitHub repositories

Create `project-vault` as PRIVATE and `project-arcade` as public or private. Copy only the matching app folder into each repository. Never upload this entire delivery bundle publicly. Keep every real game in its own repository. No credentials are needed in either frontend.

From each copied app folder:

```sh
git init -b main
git add .
git commit -m "Initial version 1"
git remote add origin https://github.com/YOUR-ACCOUNT/REPOSITORY.git
git push -u origin main
```

Authenticate using your normal GitHub credential manager. Replace placeholders first. The included workflow runs tests and builds; it does not deploy. Add branch protection requiring the `check` job, review catalog changes and disable automatic merging of dependency changes until builds pass. Keep node_modules, dist, local credentials and backups out of Git.

## 3. Cloudflare Pages configuration

Use a separate Pages project for each repository. In Workers & Pages, create a Pages application using Git integration, connect GitHub and grant access only to the chosen repositories. Select production branch `main`, framework Vite, root directory the repository root, build command `npm ci && npm run build`, output directory `dist`, and Node build environment `NODE_VERSION=22`. Keep the generated lockfile committed.

Start with the supplied non-sensitive sample catalog. Git-connected Pages builds publish branch changes according to project settings. Configure production and preview branch controls deliberately. A failing GitHub check alone is not a deployment gate unless branch rules enforce it; the Pages build itself runs tests. No deployment hook or API token is required for this workflow.

Source: [Cloudflare Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/).

## 4. Protect the Vault before adding real metadata

Cloudflare Access is an account-side prerequisite, not implemented by a React login screen. The entire Vault origin—including JS bundles, images, demo paths and any future JSON endpoints—must require authorization.

1. Add a custom domain such as `vault.example.com` through the Pages project's Custom domains settings. Follow Cloudflare DNS instructions and wait for domain activation.
2. In Cloudflare Zero Trust, configure your identity provider or email one-time PIN. Add an Access **Self-hosted** application for the whole `vault.example.com` hostname, with no restrictive path (all paths protected).
3. Add an Allow policy for only your exact owner email/identity. Avoid Everyone, Bypass and public email-domain policies. Choose an appropriate session duration. Test denied access with a second identity.
4. Enable Pages preview access protection separately in project settings. Review its generated Access application and restrict the policy to the owner. Include branch aliases and deployment-hash URLs in verification. Preview protection does not protect the production pages.dev hostname or custom domains.
5. Close the alternate production origin: configure Cloudflare's Pages-to-custom-domain redirect for the project's `PROJECT.pages.dev` address, preserving paths, subpaths and query strings. Verify it redirects every asset request to the protected custom domain. Do not assume adding a custom domain disables pages.dev. If redirect/protection cannot be verified for any origin, keep sample-only data deployed or remove that deployment.
6. Protect any other private game previews with their own Access rules. Protecting the Vault does not protect linked games or private GitHub previews.

Sources: [Self-hosted Access setup](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/), [Pages preview protection and limits](https://developers.cloudflare.com/pages/configuration/preview-deployments/), [Redirect pages.dev to a custom domain](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/).

## 5. Verify access before launch

Use a clean signed-out browser and a terminal with no Access cookies or service tokens. Record date, URL and result in a private deployment log.

| Target | Required result without an authorized session |
| --- | --- |
| Vault custom domain `/` and a detail hash link | Login challenge or denial; no Vault content |
| Exact `/assets/*.js` URL copied from built index.html | Login challenge or denial; no bundle bytes |
| A `/covers/*.svg` and `/demos/*.html` URL | Login challenge or denial |
| Production `PROJECT.pages.dev` with the same paths | Redirect to protected custom domain; no private content |
| Every current hash preview and branch alias | Access challenge or denial |
| Authorized owner after login | Catalog and assets load correctly |
| Unapproved second identity | Access denied |
| Public Arcade and approved launch destinations | Available without Vault login |

For each URL, `curl -i URL` shows the first response; `curl -i -L URL` checks redirect destinations. A 302 by itself is insufficient: inspect Location and final content. A 200 containing an Access login page is different from a 200 containing a private JavaScript bundle. Verify browser caching and logout behavior on a shared device. Static Vault headers request no-store; they do not enforce login. Repeat tests after domain, policy or deployment changes. Do not add real metadata until all checks pass.

## 6. Add and publish a real project

Update its private Vault record, replacing REPLACE-ME source links and samples. Preserve README.md and AI_CONTEXT.md in each game's repository. Track version, notes, tasks and bugs privately. Commit changes after `npm run build` passes. Status/visibility fields are documentation, not access rules.

Test and deploy the real game first. Verify the intended public URL, instructions, mobile controls and artwork. In a separate Arcade pull request, manually create an approved public record using only its strict public fields. Review all prose, tags, URLs and images for sensitive information. Do not export the private record. Put your featured entry first. Run the Arcade build and review the output, then merge. A Vault deployment never changes the Arcade catalog.

Unpublishing removes the Arcade entry and rebuilds the listing. It does not disable the game URL, erase cached public copies or make previously published information private. Restrict or remove the game's deployment separately when necessary.

## 7. Backup and restore

Tag stable releases and keep encrypted local/offsite Git backups for the private Vault and games. A `git clone --mirror` backup preserves branches and tags; retain independent copies rather than only a synchronized mirror. Back up source artwork and Cloudflare configuration separately. Never put private backups into the Arcade repository. Test recovery in a fresh directory: clone, check out a known tag, `npm ci`, `npm run build`, review the catalog and redeploy to a protected staging hostname. Revert a bad commit through a PR or use a reviewed Cloudflare rollback, then recheck Access on every origin.

## Scope and limits

Version 1 is a static project manager and launcher. Metadata changes are file edits reviewed in GitHub. No database, browser editor, automatic GitHub import, automatic publishing, remote AI call or custom authentication service is included. Demos and covers are original illustrative samples, not screenshots of your repositories. No live accounts were connected for this delivery. Public schema validation rejects private keys; manual review is still necessary for private information hidden in allowed text fields or images.
