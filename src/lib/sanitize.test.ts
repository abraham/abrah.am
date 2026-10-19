import { describe, expect, it } from 'vitest';
import { sanitizePostHtml } from './sanitize';

describe('sanitizePostHtml', () => {
  it('keeps paragraphs, line breaks, and http(s) links with a forced rel', () => {
    expect(sanitizePostHtml('<p>Hi<br><a href="https://example.com" target="_blank" rel="me">link</a></p>')).toBe(
      '<p>Hi<br /><a href="https://example.com" rel="nofollow noopener ugc">link</a></p>',
    );
  });

  it("keeps Mastodon's link-shortening classes and drops other classes", () => {
    expect(
      sanitizePostHtml(
        '<p class="quote-inline"><a class="mention hashtag" href="https://a.example/"><span class="invisible">https://</span><span class="ellipsis">a.example</span><span class="x">!</span></a></p>',
      ),
    ).toBe(
      '<p><a href="https://a.example/" rel="nofollow noopener ugc"><span class="invisible">https://</span><span class="ellipsis">a.example</span><span>!</span></a></p>',
    );
  });

  it.each([
    ['script tags', '<p>a</p><script>alert(1)</script>', '<p>a</p>'],
    ['event handlers', '<p onclick="alert(1)">a<img src=x onerror="alert(1)"></p>', '<p>a</p>'],
    ['javascript: hrefs', '<a href="javascript:alert(1)">a</a>', '<a rel="nofollow noopener ugc">a</a>'],
    ['data: hrefs', '<a href="data:text/html,<script>alert(1)</script>">a</a>', '<a rel="nofollow noopener ugc">a</a>'],
    ['protocol-relative hrefs', '<a href="//evil.example/">a</a>', '<a rel="nofollow noopener ugc">a</a>'],
    ['iframes', '<p>a</p><iframe src="https://evil.example/"></iframe>', '<p>a</p>'],
    ['style attributes', '<p style="position:fixed">a</p>', '<p>a</p>'],
  ])('neutralizes %s', (_name, input, expected) => {
    expect(sanitizePostHtml(input)).toBe(expected);
  });
});
