const { defineConfig } = require("cypress");
let noteId

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  e2e: {
    baseUrl:'https://app-mpay-stag.homolog.dev.br',
    setupNodeEvents(on, config) {
      on('task', {
        saveNoteId(id) {
          noteId = id
          return noteId
        },
        getNoteId() {
          return noteId
        }
      })
      return config
    },
    experimentalRunAllSpecs: true,
  },
});






