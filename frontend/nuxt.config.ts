export default defineNuxtConfig({
  ssr: false, // Temporary fix: Disable SSR to see if the page loads in client-only mode
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost'
      }
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000
  }
})