const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://app-mpay-stag.homolog.dev.br',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
