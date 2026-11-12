import { describe, expect, it } from 'vitest';
import type { GitHubRepoCard } from './github';
import type { NpmPackageCard } from './npm';
import type { PubPackageCard } from './pub';
import { combineProject } from './projects';

const repo: GitHubRepoCard = {
  fullName: 'abraham/nutmeg',
  url: 'https://github.com/abraham/nutmeg',
  description: 'From GitHub',
  language: 'TypeScript',
  stars: '1.2K',
  license: 'MIT',
  archived: true,
  fallback: false,
};

const pkg: NpmPackageCard = {
  name: '@nutmeg/cli',
  url: 'https://www.npmjs.com/package/@nutmeg/cli',
  global: true,
  dev: false,
  description: 'From npm',
  version: '1.0.0',
  license: 'ISC',
  deprecated: false,
  fallback: false,
};

const pub: PubPackageCard = {
  name: 'simple_polls',
  url: 'https://pub.dev/packages/simple_polls',
  description: 'From pub.dev',
  version: '3.0.0',
  flutter: true,
  discontinued: true,
  fallback: false,
};

describe('combineProject', () => {
  it('merges every source and links the website first', () => {
    const card = combineProject(
      {
        name: 'Nutmeg',
        url: 'https://nutmeg.dev/',
        playStore: 'https://play.google.com/store/apps/details?id=n',
        marketplace: 'https://github.com/marketplace/actions/n',
        youtube: 'https://youtu.be/n',
      },
      repo,
      pkg,
    );

    expect(card).toMatchObject({
      url: 'https://nutmeg.dev/',
      description: 'From GitHub',
      language: 'TypeScript',
      stars: '1.2K',
      version: '1.0.0',
      license: 'MIT',
      archived: true,
      install: 'npm install @nutmeg/cli --global',
      fallback: false,
    });
    expect(card.links.map((link) => link.kind)).toEqual([
      'website',
      'playStore',
      'marketplace',
      'github',
      'npm',
      'youtube',
    ]);
  });

  it('installs dev dependencies with --save-dev', () => {
    expect(combineProject({ name: 'n' }, undefined, { ...pkg, global: false, dev: true }).install).toBe(
      'npm install @nutmeg/cli --save-dev',
    );
  });

  it('prefers the local description, then GitHub, then npm', () => {
    expect(combineProject({ name: 'n', description: 'Local' }, repo, pkg).description).toBe('Local');
    expect(combineProject({ name: 'n' }, { ...repo, description: undefined }, pkg).description).toBe('From npm');
  });

  it('falls back to npm for the title link and flags any failed source', () => {
    const card = combineProject({ name: 'n' }, undefined, { ...pkg, fallback: true });

    expect(card.url).toBe(pkg.url);
    expect(card.fallback).toBe(true);
  });

  it('installs pub.dev packages with flutter or dart and flags discontinued ones', () => {
    const card = combineProject({ name: 'simple_polls' }, undefined, undefined, pub);

    expect(card).toMatchObject({
      url: pub.url,
      description: 'From pub.dev',
      version: '3.0.0',
      deprecated: true,
      install: 'flutter pub add simple_polls',
    });
    expect(combineProject({ name: 'n' }, undefined, undefined, { ...pub, flutter: false }).install).toBe(
      'dart pub add simple_polls',
    );
  });

  it('rejects a project without any source', () => {
    expect(() => combineProject({ name: 'Empty' })).toThrow('Empty');
  });
});
