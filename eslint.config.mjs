import pluginJest from 'eslint-plugin-jest';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

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
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      jest: pluginJest,
    },
  },
);
