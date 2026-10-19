import type { NodePackage } from '../../data/projects';
import { fetchJson } from './fetch-json';

export interface NpmPackageCard {
  name: string;
  url: string;
  global: boolean;
  description?: string;
  version?: string;
  license?: string;
  deprecated: boolean;
  /** True when the registry couldn't be reached and only local data is shown. */
  fallback: boolean;
}

interface RegistryManifest {
  version: string;
  description?: string;
  license?: string;
  deprecated?: string;
}

export async function fetchNpmPackage({ name, global }: NodePackage): Promise<NpmPackageCard> {
  const card = { name, global, url: `https://www.npmjs.com/package/${name}` };

  try {
    const manifest = await fetchJson<RegistryManifest>(`https://registry.npmjs.org/${name.replace('/', '%2F')}/latest`);
    return {
      ...card,
      description: manifest.description,
      version: manifest.version,
      license: manifest.license,
      deprecated: Boolean(manifest.deprecated),
      fallback: false,
    };
  } catch (error) {
    console.warn(`[npm] ${name}: ${error}`);
    return { ...card, deprecated: false, fallback: true };
  }
}
