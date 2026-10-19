export interface NodePackage {
  name: string;
  global: boolean;
}

export interface GitHubRepo {
  /** `owner/repo` */
  owner: string;
}

export const nodePackages: NodePackage[] = [
  {
    name: '@nutmeg/cli',
    global: true,
  },
  {
    name: 'node-package',
    global: false,
  },
  {
    name: 'twitter-status',
    global: false,
  },
  {
    name: 'twitter-user',
    global: false,
  },
  {
    name: 'github-repository',
    global: false,
  },
  {
    name: 'twitter-d',
    global: false,
  },
  {
    name: '@abraham/remotedata',
    global: false,
  },
  {
    name: '@abraham/reflection',
    global: false,
  },
];

export const githubRepos: GitHubRepo[] = [
  {
    owner: 'abraham/twitteroauth',
  },
  {
    owner: 'abraham/pwa-ng',
  },
  {
    owner: 'abraham/gde-social',
  },
  {
    owner: 'abraham/coderetreat',
  },
  {
    owner: 'abraham/end-of-day',
  },
  {
    owner: 'abraham/sprinkle',
  },
];
