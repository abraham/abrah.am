export interface NpmSource {
  name: string;
  /** Show `--global` in the install command. */
  global?: boolean;
  /** Show `--save-dev` in the install command. */
  dev?: boolean;
}

export interface PubSource {
  name: string;
}

/** A project with any combination of a website, Play Store listing, GitHub Marketplace listing, GitHub repo, npm package, pub.dev package, and YouTube video. */
export interface Project {
  name: string;
  /** Overrides the fetched descriptions. */
  description?: string;
  /** Website; preferred as the title link. */
  url?: string;
  /** `owner/repo` */
  github?: string;
  npm?: NpmSource;
  pub?: PubSource;
  /** YouTube video, such as a demo or talk. */
  youtube?: string;
  /** Google Play Store listing. */
  playStore?: string;
  /** GitHub Marketplace listing. */
  marketplace?: string;
}

export const projects: Project[] = [
  {
    name: 'LLM Kitchen',
    description: 'How a large language model works, one idea at a time',
    url: 'https://llm.kitchen/',
    github: 'abraham/llm-kitchen',
  },
  {
    name: 'Meowstodon',
    description: 'The purrfect Mastodon app for Android',
    url: 'https://meowstodon.app/',
    playStore: 'https://play.google.com/store/apps/details?id=app.meowstodon.meowstodon',
  },
  {
    name: 'Dieselpunk UI',
    description: 'Industrial game-style Web Components',
    url: 'https://dieselpunk.dev/',
    github: 'abraham/dieselpunk',
    npm: { name: '@dieselpunk/core' },
  },
  {
    name: 'Dockerfile Explainer',
    description: 'Learn what each Dockerfile instruction does',
    url: 'https://dockerfile.pub/',
    github: 'abraham/dockerfile-pub',
  },
  {
    name: 'Daily Cat',
    description: 'A new cat photo from Unsplash every day',
    url: 'https://daily.cat/',
    github: 'abraham/daily-cat',
  },
  {
    name: 'factorio.blue',
    description: 'Factorio 2.0 blueprints, with maps and bills of materials',
    url: 'https://factorio.blue/',
  },
  {
    name: 'modern.css',
    url: 'https://modern.ink/',
    github: 'abraham/modern.css',
  },
  {
    name: 'Mastodon OpenAPI',
    url: 'https://abraham.github.io/mastodon-openapi/',
    github: 'abraham/mastodon-openapi',
  },
  {
    name: 'Shameful History',
    url: 'https://shamefulhistory.com/',
    github: 'abraham/shameful-history',
  },
  {
    name: 'Eggnog Reviews',
    description: 'Holiday drink, drunk',
    url: 'https://eggnog.reviews/',
  },
  {
    name: 'firebase-wif',
    marketplace: 'https://github.com/marketplace/actions/firebase-wif',
    github: 'abraham/firebase-wif',
    npm: { name: '@abraham/firebase-wif', global: true },
  },
  {
    name: 'pkg-ok',
    github: 'abraham/pkg-ok',
    npm: { name: 'pkg-ok', dev: true },
  },
  {
    name: 'Nutmeg',
    github: 'abraham/nutmeg',
    npm: { name: '@nutmeg/cli', global: true },
  },
  {
    name: 'node-package',
    github: 'abraham/node-package',
    npm: { name: 'node-package' },
  },
  {
    name: 'twitter-status',
    github: 'abraham/twitter-status',
    npm: { name: 'twitter-status' },
  },
  {
    name: 'twitter-user',
    github: 'abraham/twitter-user',
    npm: { name: 'twitter-user' },
  },
  {
    name: 'github-repository',
    github: 'abraham/github-repository',
    npm: { name: 'github-repository' },
  },
  {
    name: 'twitter-d',
    github: 'abraham/twitter-d',
    npm: { name: 'twitter-d' },
  },
  {
    name: '@abraham/remotedata',
    github: 'abraham/remotedata',
    npm: { name: '@abraham/remotedata' },
  },
  {
    name: '@abraham/reflection',
    github: 'abraham/reflection',
    npm: { name: '@abraham/reflection' },
  },
  {
    name: 'Hoverboard',
    github: 'gdg-x/hoverboard',
  },
  {
    name: 'simple_polls',
    github: 'abraham/simple_polls',
    pub: { name: 'simple_polls' },
  },
  {
    name: 'mastodon_dart',
    github: 'abraham/mastodon_dart',
    pub: { name: 'mastodon' },
  },
  {
    name: 'embedded_photo_picker',
    github: 'abraham/embedded_photo_picker',
    pub: { name: 'embedded_photo_picker' },
  },
  {
    name: 'm3_floating_toolbar',
    github: 'abraham/m3_floating_toolbar',
    pub: { name: 'm3_floating_toolbar' },
  },
  {
    name: 'c2pa_dart',
    github: 'abraham/c2pa_dart',
    pub: { name: 'c2pa' },
  },
  {
    name: 'ai_image_provenance_dart',
    github: 'abraham/ai_image_provenance_dart',
    pub: { name: 'ai_image_provenance' },
  },
  {
    name: 'abraham/twitteroauth',
    github: 'abraham/twitteroauth',
  },
  {
    name: 'abraham/github-models-dart',
    github: 'abraham/github-models-dart',
  },
  {
    name: 'Birb',
    url: 'https://bendyworks.com/blog/a-month-of-flutter/',
    github: 'abraham/birb',
  },
  {
    name: 'abraham/life',
    github: 'abraham/life',
    youtube: 'https://youtu.be/_hewWDDvkMQ',
  },
  {
    name: 'abraham/quark',
    github: 'abraham/quark',
  },
  {
    name: 'abraham/pwa-ng',
    github: 'abraham/pwa-ng',
  },
  {
    name: 'abraham/gde-social',
    github: 'abraham/gde-social',
  },
  {
    name: 'abraham/coderetreat',
    github: 'abraham/coderetreat',
  },
  {
    name: 'abraham/end-of-day',
    github: 'abraham/end-of-day',
  },
  {
    name: 'abraham/sprinkle',
    github: 'abraham/sprinkle',
  },
];
