import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: true, // 启用视频录制
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
