import { defineConfig } from 'vite'
import { resolve } from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import handlebars from 'vite-plugin-handlebars';

const pageData: Record<string, object> = {
  '/index.html': {
    title: 'Main Page',
  }
};

const srcDir = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vite.dev/config/
export default defineConfig({
  root: resolve(srcDir, './pages'),
  build: {outDir},
  plugins: [handlebars({
    context: (pagePath: string) => pageData[pagePath],
    partialDirectory: resolve(srcDir,'./components'),
  })],
})
