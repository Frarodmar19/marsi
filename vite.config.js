import path from 'node:path';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

// HANDLERS DE ERRORES HORIZONS (SOLO PARA DEV)
const configHorizonsViteErrorHandler = `...`; // OMITIDO POR BREVEDAD
const configHorizonsRuntimeErrorHandler = `...`;
const configHorizonsConsoleErrorHandler = `...`;
const configWindowFetchMonkeyPatch = `...`;

const addTransformIndexHtml = {
  name: 'add-transform-index-html',
  transformIndexHtml(html) {
    return {
      html,
      tags: [
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configHorizonsRuntimeErrorHandler,
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configHorizonsViteErrorHandler,
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configHorizonsConsoleErrorHandler,
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configWindowFetchMonkeyPatch,
          injectTo: 'head',
        },
      ],
    };
  },
};

// Logger ajustado para evitar spam de errores CSS en Horizon
const logger = createLogger();
const originalError = logger.error;

logger.error = (msg, options) => {
  if (options?.error?.toString().includes('CssSyntaxError: [postcss]')) return;
  originalError(msg, options);
};

export default defineConfig({
  base: './', // <-- NECESARIO PARA DEPLOY EN RENDER
  customLogger: logger,
  plugins: [react(), addTransformIndexHtml],
  server: {
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
    allowedHosts: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
