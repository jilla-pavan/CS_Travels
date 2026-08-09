import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    /**
     * The UI library re-exports Radix primitives under project names
     * (`export const Modal = DialogPrimitive.Root`) — the standard shadcn
     * pattern, and the reason these files export non-component bindings.
     *
     * react-refresh/only-export-components is a hot-reload granularity hint,
     * not a correctness rule: the cost is that editing one of these files
     * reloads a bit more of the tree. Splitting every primitive into its own
     * file to satisfy it would be worse code for no runtime benefit.
     */
    files: ['src/components/ui/**/*.jsx', 'src/providers/**/*.jsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
