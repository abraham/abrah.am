import type { APIRoute } from 'astro';
import { fetchSiteData } from '../lib/sources/index.ts';

export const GET: APIRoute = async () => {
  const { hash } = await fetchSiteData();
  return new Response(hash, { headers: { 'Content-Type': 'text/plain' } });
};
