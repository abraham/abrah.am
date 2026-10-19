import sanitizeHtml from 'sanitize-html';

/** Reduces untrusted Mastodon post HTML to paragraphs, line breaks, and safe links. */
export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'a', 'span'],
    allowedAttributes: {
      a: ['href', 'rel'],
      span: ['class'],
    },
    // Mastodon shortens long link text with these classes.
    allowedClasses: {
      span: ['invisible', 'ellipsis'],
    },
    allowedSchemes: ['http', 'https'],
    allowedSchemesByTag: {},
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'nofollow noopener ugc' }),
    },
  });
}
