import { defineConfig } from 'vite'
import { resolve } from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import handlebars from 'vite-plugin-handlebars';

import {pageData} from "./src/pages.ts";


function getInput() {
  const input: Record<string, string> = {}

  Object.keys(pageData).forEach((key, index) => {
    input[index.toString()] = resolve(srcDir, key)
  })

  return input
}

const srcDir = resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
  root: srcDir,
  build: {
    outDir: resolve(__dirname, 'dist'),
    copyPublicDir: true,
    rollupOptions: {
      input: getInput(),
    }},
  plugins: [handlebars({
    context: (pagePath: string) => pageData[pagePath],
    partialDirectory: resolve(srcDir,'./components'),
  })],
  preview:{
    port: 3000
  }
})
