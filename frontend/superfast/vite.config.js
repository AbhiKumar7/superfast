import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  server:{
    port:3000,
    proxy:{
      "/userapi": "http://localhost:7000",
      "/categoryapi": "http://localhost:7000",
      "/subcategoryapi": "http://localhost:7000",
      "/productapi": "http://localhost:7000",
      "/cartapi": "http://localhost:7000",
      "/addressapi": "http://localhost:7000",
      "/orderapi": "http://localhost:7000",
    }
    
  },
  plugins: [react(), tailwindcss()],
});
