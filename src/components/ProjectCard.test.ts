import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import type { ProjectCard as Project } from '../lib/sources/projects';
import ProjectCard from './ProjectCard.astro';

async function render(project: Project): Promise<string> {
  const container = await AstroContainer.create();
  return container.renderToString(ProjectCard, { props: { project } });
}

describe('ProjectCard', () => {
  it('renders a link for each source', async () => {
    const html = await render({
      name: 'LLM Kitchen',
      url: 'https://llm.kitchen/',
      links: [
        { kind: 'website', url: 'https://llm.kitchen/' },
        { kind: 'github', url: 'https://github.com/abraham/llm-kitchen' },
      ],
      stars: '12',
      archived: false,
      deprecated: false,
      install: 'npm install llm-kitchen',
      fallback: false,
    });

    expect(html).toContain('href="https://llm.kitchen/"');
    expect(html).toContain('href="https://github.com/abraham/llm-kitchen"');
    expect(html).toMatch(/Website<span class="visually-hidden"> for LLM Kitchen<\/span>/);
    expect(html).toContain('npm install llm-kitchen');
    expect(html).toMatch(/<button[^>]*data-copy="npm install llm-kitchen"[^>]*hidden/);
    expect(html).toContain('card__meta');
  });

  it('omits empty metadata for website-only projects', async () => {
    const html = await render({
      name: 'Meowstodon',
      url: 'https://meowstodon.app/',
      links: [{ kind: 'website', url: 'https://meowstodon.app/' }],
      archived: false,
      deprecated: false,
      fallback: false,
    });

    expect(html).not.toContain('card__meta');
    expect(html).not.toContain('card__install');
  });
});
