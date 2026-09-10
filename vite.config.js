import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/',
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre.html'),
        solucoes: resolve(__dirname, 'solucoes.html'),
        obras: resolve(__dirname, 'obras.html'),
        andamento: resolve(__dirname, 'obras-em-andamento.html'),
        clientes: resolve(__dirname, 'clientes.html'),
        contato: resolve(__dirname, 'contato.html'),
      },
    },
  },
  server: { host: true, port: 5173 },
});
