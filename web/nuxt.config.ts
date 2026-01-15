export default defineNuxtConfig({
  runtimeConfig: {
    apiBase: process.env.API_BASE || "http://localhost:3001",
  },
});
