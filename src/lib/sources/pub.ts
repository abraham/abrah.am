import type { PubSource } from '../../data/projects.ts';
import { fetchJson } from './fetch-json.ts';

export interface PubPackageCard {
  name: string;
  url: string;
  description?: string;
  version?: string;
  /** Depends on the Flutter SDK, so installs with `flutter pub add`. */
  flutter: boolean;
  discontinued: boolean;
  /** True when pub.dev couldn't be reached and only local data is shown. */
  fallback: boolean;
}

interface PackageResponse {
  isDiscontinued?: boolean;
  latest: {
    version: string;
    pubspec: {
      description?: string;
      dependencies?: Record<string, unknown>;
    };
  };
}

export async function fetchPubPackage({ name }: PubSource): Promise<PubPackageCard> {
  const card = { name, url: `https://pub.dev/packages/${name}` };

  try {
    const pkg = await fetchJson<PackageResponse>(`https://pub.dev/api/packages/${name}`);
    return {
      ...card,
      description: pkg.latest.pubspec.description,
      version: pkg.latest.version,
      flutter: Boolean(pkg.latest.pubspec.dependencies?.flutter),
      discontinued: Boolean(pkg.isDiscontinued),
      fallback: false,
    };
  } catch (error) {
    console.warn(`[pub] ${name}: ${error}`);
    return { ...card, flutter: false, discontinued: false, fallback: true };
  }
}
