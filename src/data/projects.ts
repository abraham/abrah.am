export interface NodePackage {
  name: string;
  global: boolean;
}

export interface GitHubRepo {
  /** `owner/repo` */
  owner: string;
}

export interface Promo {
  url: string;
  name: string;
  description: string;
}

export const promos: Promo[] = [
  {
    url: 'https://llm.kitchen/',
    name: 'LLM Kitchen',
    description: 'How a large language model works, one idea at a time',
  },
  {
    url: 'https://meowstodon.app/',
    name: 'Meowstodon',
    description: 'The purrfect Mastodon app for Android',
  },
  {
    url: 'https://dieselpunk.dev/',
    name: 'Dieselpunk UI',
    description: 'Industrial game-style Web Components',
  },
  {
    url: 'https://dockerfile.pub/',
    name: 'Dockerfile Explainer',
    description: 'Learn what each Dockerfile instruction does',
  },
  {
    url: 'https://daily.cat/',
    name: 'Daily Cat',
    description: 'A new cat photo from Unsplash every day',
  },
];

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
    owner: 'abraham/llm-kitchen',
  },
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
