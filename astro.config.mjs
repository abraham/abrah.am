import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import { injectManifest } from 'workbox-build';

/**
 * Bundles src/sw/sw.ts into dist/sw.js and injects the Workbox precache manifest.
 * @returns {import('astro').AstroIntegration}
 */
function serviceWorker() {
  return {
    name: 'service-worker',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const swDest = fileURLToPath(new URL('sw.js', dir));

        await build({
          configFile: false,
          logLevel: 'warn',
          publicDir: false,
          define: { 'process.env.NODE_ENV': JSON.stringify('production') },
          build: {
            outDir,
            emptyOutDir: false,
            lib: {
              entry: fileURLToPath(new URL('./src/sw/sw.ts', import.meta.url)),
              formats: ['iife'],
              name: 'sw',
              fileName: () => 'sw.js',
            },
          },
        });

        const { count, size, warnings } = await injectManifest({
          swSrc: swDest,
          swDest,
          globDirectory: outDir,
          globPatterns: ['**/*.{html,js,css,json,txt,ico,png,jpg,webp,avif}'],
          // App icons are only fetched by the browser at install time.
          globIgnores: ['sw.js', 'img/icon-*'],
          dontCacheBustURLsMatching: /^_astro\//,
        });
        warnings.forEach((warning) => logger.warn(warning));
        logger.info(`Precached ${count} files (${Math.round(size / 1024)} KiB)`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://abrah.am',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [serviceWorker()],
  vite: {
    environments: {
      prerender: {
        // Root node_modules has cookie@0.7 (via express); bundle Astro's nested cookie@2 into the prerenderer.
        resolve: { noExternal: ['cookie'] },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [fileURLToPath(new URL('./node_modules', import.meta.url))],
        },
      },
    },
  },
});
