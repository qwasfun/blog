import { defineConfig } from 'cypress'

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    video: true, // 启用视频录制
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
