// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: '{blocks,tests}/**/*.spec.js',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npx -y @adobe/aem-cli up --no-open --forward-browser-logs --html-folder tests',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 30000,
  },
});
