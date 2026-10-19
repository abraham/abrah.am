import type { IconName } from '../components/Icon.astro';

export interface ProfileLink {
  url: string;
  text: string;
  icon: IconName;
  sameAs?: boolean;
  relMe?: boolean;
}

export const links: ProfileLink[] = [
  {
    url: 'https://indieweb.social/@abraham',
    sameAs: true,
    relMe: true,
    icon: 'person',
    text: 'Mastodon',
  },
  {
    url: 'https://github.com/abraham',
    sameAs: true,
    relMe: true,
    icon: 'code',
    text: 'GitHub',
  },
  {
    url: 'https://slides.today',
    icon: 'personal_video',
    text: 'Presentations',
  },
  {
    url: 'https://www.linkedin.com/in/afivem/',
    sameAs: true,
    relMe: true,
    icon: 'person',
    text: 'LinkedIn',
  },
  {
    url: 'https://www.npmjs.com/~abraham',
    sameAs: true,
    relMe: true,
    icon: 'code',
    text: 'npm',
  },
  {
    url: 'https://g.dev/abraham',
    sameAs: true,
    relMe: true,
    icon: 'code',
    text: 'Google Developers',
  },
  {
    url: 'https://stackoverflow.com/users/story/26406',
    sameAs: true,
    relMe: true,
    icon: 'code',
    text: 'Stack Overflow',
  },
  {
    url: 'https://dev.to/abraham',
    sameAs: true,
    relMe: true,
    icon: 'code',
    text: 'DEV',
  },
  {
    url: 'https://codepen.io/abraham/',
    sameAs: true,
    relMe: true,
    icon: 'code',
    text: 'CodePen',
  },
  {
    url: 'https://www.youtube.com/@abrahamwilliams',
    sameAs: true,
    relMe: true,
    icon: 'videocam',
    text: 'YouTube',
  },
  {
    url: 'https://blog.abrah.am',
    icon: 'rss_feed',
    text: 'Blog',
  },
];
