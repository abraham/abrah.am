import { projects as projectSources } from '../../data/projects.ts';
import { contentHash } from '../content-hash.ts';
import { fetchMastodonPosts, type MastodonPosts } from './mastodon.ts';
import { fetchProject, type ProjectCard } from './projects.ts';

export interface SiteData {
  projects: ProjectCard[];
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
  const [projects, mastodon] = await Promise.all([Promise.all(projectSources.map(fetchProject)), fetchMastodonPosts()]);
  const degraded = projects.some((project) => project.fallback) || mastodon.fallback;

  return {
    projects,
    mastodon,
    degraded,
    hash: contentHash({ projects, posts: mastodon.posts }),
  };
}
