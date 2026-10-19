const TIMEOUT_MS = 10_000;

/** Fetches JSON, retrying once on failure. */
export async function fetchJson<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
  try {
    return await fetchOnce<T>(url, headers);
  } catch {
    return fetchOnce<T>(url, headers);
  }
}

async function fetchOnce<T>(url: string, headers: Record<string, string>): Promise<T> {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}
