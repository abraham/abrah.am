import eslint from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  // Apply recommended config to all files
  eslint.configs.recommended,

  // TypeScript configuration
  ...tseslint.configs.recommended,

  // Astro components
  ...eslintPluginAstro.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.es2015,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },

    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Node.js configuration for config files
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],

    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2015,
      },
    },

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Node.js TypeScript files
  {
    files: ['scripts/**/*.ts'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Script blocks inside .astro files; `prettier --check` already formats the whole file
  {
    files: ['**/*.astro/*.ts', '**/*.astro/*.js'],
    rules: {
      'prettier/prettier': 'off',
    },
  },

  // Prettier config to disable conflicting rules
  prettierConfig,

  {
    ignores: ['node_modules/**', 'dist/**', '.astro/**', '.firebase/**', 'coverage/**'],
  },
);
