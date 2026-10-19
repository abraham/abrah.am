import type { GitHubRepo } from '../../data/projects';
import { fetchJson } from './fetch-json';

export interface GitHubRepoCard {
  fullName: string;
  url: string;
  description?: string;
  language?: string;
  stars?: number;
  license?: string;
  archived: boolean;
  /** True when the API couldn't be reached and only local data is shown. */
  fallback: boolean;
}

interface RepoResponse {
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  license: { spdx_id: string } | null;
  archived: boolean;
}

export async function fetchGitHubRepo({ owner }: GitHubRepo): Promise<GitHubRepoCard> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const repo = await fetchJson<RepoResponse>(`https://api.github.com/repos/${owner}`, headers);
    const license = repo.license?.spdx_id;
    return {
      fullName: repo.full_name,
      url: repo.html_url,
      description: repo.description ?? undefined,
      language: repo.language ?? undefined,
      stars: repo.stargazers_count,
      license: license && license !== 'NOASSERTION' ? license : undefined,
      archived: repo.archived,
      fallback: false,
    };
  } catch (error) {
    console.warn(`[github] ${owner}: ${error}`);
    return { fullName: owner, url: `https://github.com/${owner}`, archived: false, fallback: true };
  }
}
