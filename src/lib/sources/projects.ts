import type { Project } from '../../data/projects.ts';
import { fetchGitHubRepo, type GitHubRepoCard } from './github.ts';
import { fetchNpmPackage, type NpmPackageCard } from './npm.ts';
import { fetchPubPackage, type PubPackageCard } from './pub.ts';

export interface ProjectLink {
  kind: 'website' | 'playStore' | 'marketplace' | 'github' | 'npm' | 'pub' | 'youtube';
  url: string;
}

export interface ProjectCard {
  name: string;
  /** The first link: website, Play Store, Marketplace, GitHub, npm, pub.dev, then YouTube. */
  url: string;
  description?: string;
  links: ProjectLink[];
  language?: string;
  stars?: string;
  version?: string;
  license?: string;
  archived: boolean;
  deprecated: boolean;
  /** Install command, when the project is published to npm or pub.dev. */
  install?: string;
  /** True when any source couldn't be reached and only local data is shown. */
  fallback: boolean;
}

export async function fetchProject(project: Project): Promise<ProjectCard> {
  const [repo, pkg, pub] = await Promise.all([
    project.github ? fetchGitHubRepo(project.github) : undefined,
    project.npm ? fetchNpmPackage(project.npm) : undefined,
    project.pub ? fetchPubPackage(project.pub) : undefined,
  ]);
  return combineProject(project, repo, pkg, pub);
}

/** Merges a project's sources; local data wins, then GitHub, then npm, then pub.dev. */
export function combineProject(
  project: Project,
  repo?: GitHubRepoCard,
  pkg?: NpmPackageCard,
  pub?: PubPackageCard,
): ProjectCard {
  const links: ProjectLink[] = [
    ...(project.url ? [{ kind: 'website' as const, url: project.url }] : []),
    ...(project.playStore ? [{ kind: 'playStore' as const, url: project.playStore }] : []),
    ...(project.marketplace ? [{ kind: 'marketplace' as const, url: project.marketplace }] : []),
    ...(repo ? [{ kind: 'github' as const, url: repo.url }] : []),
    ...(pkg ? [{ kind: 'npm' as const, url: pkg.url }] : []),
    ...(pub ? [{ kind: 'pub' as const, url: pub.url }] : []),
    ...(project.youtube ? [{ kind: 'youtube' as const, url: project.youtube }] : []),
  ];
  if (links.length === 0) {
    throw new Error(
      `Project "${project.name}" needs a url, playStore, marketplace, github, npm, pub, or youtube source`,
    );
  }

  return {
    name: project.name,
    url: links[0].url,
    description: project.description ?? repo?.description ?? pkg?.description ?? pub?.description,
    links,
    language: repo?.language,
    stars: repo?.stars,
    version: pkg?.version ?? pub?.version,
    license: repo?.license ?? pkg?.license,
    archived: repo?.archived ?? false,
    deprecated: Boolean(pkg?.deprecated || pub?.discontinued),
    install: pkg
      ? `npm install ${pkg.name}${pkg.global ? ' --global' : pkg.dev ? ' --save-dev' : ''}`
      : pub && `${pub.flutter ? 'flutter' : 'dart'} pub add ${pub.name}`,
    fallback: Boolean(repo?.fallback || pkg?.fallback || pub?.fallback),
  };
}
