import pluginJest from 'eslint-plugin-jest';
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

// Nasty workaround for globals (https://github.com/sindresorhus/globals/issues/239)
// due to @babel/core still using an outdated version of the library
const GLOBALS_BROWSER_FIX = {
  ...globals.browser,
  AudioWorkletGlobalScope: globals.browser['AudioWorkletGlobalScope '],
};
delete GLOBALS_BROWSER_FIX['AudioWorkletGlobalScope '];

export default tseslint.config(
  {
    ignores: ['coverage/', 'dist/', 'examples/', 'node_modules/', '**/*.cjs'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      ecmaVersion: 2015,
      sourceType: 'module',
      globals: {
        // ...globals.browser,
        ...GLOBALS_BROWSER_FIX,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      jest: pluginJest,
    },
  },
);
