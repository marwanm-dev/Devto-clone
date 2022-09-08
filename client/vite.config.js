import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import macrosPlugin from 'vite-plugin-babel-macros';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), macrosPlugin()],
    root: './',
    build: {
      outDir: 'dist',
    },
    publicDir: 'src',
    server: {
      fs: {
        allow: ['..'],
      },
    },
    define: {
      'process.env': env,
    },
  };
});
