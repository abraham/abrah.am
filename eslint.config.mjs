import eslint from '@eslint/js';
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

  // Prettier config to disable conflicting rules
  prettierConfig,

  {
    ignores: ['node_modules/**', 'public/**', '.firebase/**', 'coverage/**'],
  },
);
