import { mastodon } from '../../data/mastodon';
import { fetchJson } from './fetch-json';

export interface MastodonMedia {
  type: 'image' | 'gifv' | 'video' | 'audio' | 'unknown';
  /** Small preview for images; the original URL for other types. */
  url: string;
  description?: string;
  width?: number;
  height?: number;
}

export interface MastodonPost {
  id: string;
  url: string;
  createdAt: string;
  editedAt?: string;
  /** Untrusted HTML from the instance; sanitize before rendering. */
  content: string;
  spoilerText: string;
  sensitive: boolean;
  media: MastodonMedia[];
}

export interface MastodonPosts {
  posts: MastodonPost[];
  /** True when the instance couldn't be reached. */
  fallback: boolean;
}

interface StatusResponse {
  id: string;
  url: string;
  visibility: string;
  created_at: string;
  edited_at: string | null;
  content: string;
  spoiler_text: string;
  sensitive: boolean;
  media_attachments: {
    type: MastodonMedia['type'];
    url: string;
    preview_url: string | null;
    description: string | null;
    meta?: { small?: { width: number; height: number } };
  }[];
}

export async function fetchMastodonPosts(): Promise<MastodonPosts> {
  const url = `${mastodon.instance}/api/v1/accounts/${mastodon.accountId}/statuses?exclude_replies=true&exclude_reblogs=true&limit=20`;

  try {
    const statuses = await fetchJson<StatusResponse[]>(url);
    const posts = statuses
      .filter((status) => status.visibility === 'public')
      .slice(0, mastodon.postCount)
      .map((status): MastodonPost => ({
        id: status.id,
        url: status.url,
        createdAt: status.created_at,
        editedAt: status.edited_at ?? undefined,
        content: status.content,
        spoilerText: status.spoiler_text,
        sensitive: status.sensitive,
        media: status.media_attachments.map((media) =>
          media.type === 'image' && media.preview_url
            ? {
                type: media.type,
                url: media.preview_url,
                description: media.description ?? undefined,
                width: media.meta?.small?.width,
                height: media.meta?.small?.height,
              }
            : { type: media.type, url: media.url, description: media.description ?? undefined },
        ),
      }));
    return { posts, fallback: false };
  } catch (error) {
    console.warn(`[mastodon] ${error}`);
    return { posts: [], fallback: true };
  }
}
