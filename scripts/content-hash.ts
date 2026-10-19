// Prints the hash of fresh upstream data for the refresh workflow: `node scripts/content-hash.ts`.
import { appendFileSync } from 'node:fs';
import { fetchSiteData } from '../src/lib/sources/index.ts';

const { hash, degraded } = await fetchSiteData();

console.log(JSON.stringify({ hash, degraded }));

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `hash=${hash}\ndegraded=${degraded}\n`);
}
