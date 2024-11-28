import { defineConfig } from "cypress";
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor());
    },
  },
});
