Abraham Williams - <abraham@abrah.am> - <https://abrah.am>

Source for <https://abrah.am>, a single-page profile site built with [Astro](https://astro.build) and hosted on Firebase.

Recent Mastodon posts and npm/GitHub project cards are fetched at build time and rendered to static HTML.

## Development

```sh
npm ci
npm start           # dev server
npm run lint
npm test            # unit tests, build, and Lighthouse CI against the hosting emulator
```

## Deployment

GitHub Actions deploys through OIDC with [firebase-wif](https://github.com/abraham/firebase-wif) (`npx @abraham/firebase-wif status` checks the setup):

- Pushes to `main` deploy to production.
- Pull requests from this repo get a preview channel.
- An hourly job redeploys when Mastodon posts or project data change.
