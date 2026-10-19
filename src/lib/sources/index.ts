import { githubRepos, nodePackages } from '../../data/projects.ts';
import { contentHash } from '../content-hash.ts';
import { fetchGitHubRepo, type GitHubRepoCard } from './github.ts';
import { fetchMastodonPosts, type MastodonPosts } from './mastodon.ts';
import { fetchNpmPackage, type NpmPackageCard } from './npm.ts';

export interface SiteData {
  packages: NpmPackageCard[];
  repos: GitHubRepoCard[];
  mastodon: MastodonPosts;
  /** True when any upstream fell back to local data. */
  degraded: boolean;
  /** Hash of the rendered upstream data, published as /content-hash.txt. */
  hash: string;
}

let cached: Promise<SiteData> | undefined;

/** Fetches every upstream once per process, so the page and /content-hash.txt share one snapshot. */
export function fetchSiteData(): Promise<SiteData> {
  cached ??= load();
  return cached;
}

async function load(): Promise<SiteData> {
  const [packages, repos, mastodon] = await Promise.all([
    Promise.all(nodePackages.map(fetchNpmPackage)),
    Promise.all(githubRepos.map(fetchGitHubRepo)),
    fetchMastodonPosts(),
  ]);
  const degraded = packages.some((pkg) => pkg.fallback) || repos.some((repo) => repo.fallback) || mastodon.fallback;

  return {
    packages,
    repos,
    mastodon,
    degraded,
    hash: contentHash({ packages, repos, posts: mastodon.posts }),
  };
}
