import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    // Using 'node' environment — we only test pure library functions.
    // React component tests (which would need jsdom) are out of scope for Phase 1.
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
