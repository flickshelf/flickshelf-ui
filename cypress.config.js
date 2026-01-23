/* eslint-disable no-undef */

import { defineConfig } from "cypress";
import 'dotenv/config';

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here

      config.env.EMAIL_E2E = process.env.EMAIL_E2E,
      config.env.PASSWORD_E2E = process.env.PASSWORD_E2E
      return config
    },
    baseUrl: 'http://localhost:5173',
    testIsolation: false,
  },
});
