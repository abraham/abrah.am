import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import type { MastodonPost as Post } from '../lib/sources/mastodon';
import MastodonPost from './MastodonPost.astro';

const basePost: Post = {
  id: '1',
  url: 'https://indieweb.social/@abraham/1',
  createdAt: '2026-10-18T19:18:56.715Z',
  content: '<p>Hello <a href="https://example.com">world</a></p>',
  spoilerText: '',
  sensitive: false,
  media: [],
};

async function render(post: Post): Promise<string> {
  const container = await AstroContainer.create();
  return container.renderToString(MastodonPost, { props: { post } });
}

describe('MastodonPost', () => {
  it('renders sanitized content, the date, and links to the post', async () => {
    const html = await render({ ...basePost, content: '<p onclick="x()">Hi<script>alert(1)</script></p>' });

    expect(html).toContain('<p>Hi</p>');
    expect(html).not.toContain('script');
    expect(html).not.toContain('onclick');
    expect(html).toContain('datetime="2026-10-18T19:18:56.715Z"');
    expect(html).toContain('href="https://indieweb.social/@abraham/1"');
  });

  it('collapses posts with a content warning', async () => {
    const html = await render({ ...basePost, spoilerText: 'Spoilers' });

    expect(html).toMatch(/<details[^>]*><summary>Spoilers<\/summary><div class="post__content e-content"/);
  });

  it('links to the post instead of embedding video', async () => {
    const html = await render({ ...basePost, media: [{ type: 'video', url: 'https://cdn.masto.host/v.mp4' }] });

    expect(html).toContain('Contains video or audio');
    expect(html).not.toContain('<video');
    expect(html).not.toContain('cdn.masto.host');
  });
});
