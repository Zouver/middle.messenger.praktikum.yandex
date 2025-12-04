import { defineConfig } from 'vite'
import { resolve } from 'path';
import {alias} from "./config/alias.ts";

const srcDir = resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
  root: srcDir,
  resolve: {alias},
  build: {
    outDir: resolve(__dirname, 'dist'),
    copyPublicDir: true,
  },
  preview:{
    port: 3000
  }
})
