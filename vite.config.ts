import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 현재 mode에 따른 환경변수 로드 (예: .env, .env.development, .env.production)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
      include: ["d3", "d3-cloud"],
    },
    compilerOptions: {
      types: ["node"],
    },
    server: {
      proxy: {
        "/temp": {
          target: env.VITE_API_URL, // .env 파일에 정의한 VITE_API_URL 사용
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/temp/, ""),
        },
      },
    },
  };
});
