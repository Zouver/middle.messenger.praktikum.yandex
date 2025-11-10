import { defineConfig } from 'vite'
import { resolve } from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import handlebars from 'vite-plugin-handlebars';

const pageData: Record<string, object> = {
  '/index.html': {
    title: 'Main',
  },
  '/login.html': {
    title: 'Login',
  },
  '/signup.html': {
    title: 'Signup',
  },
  '/error-404.html': {
    title: 'Error',
    errorCode: "404",
    errorContent: "Не туда попали"
  },
  '/error-500.html': {
    title: 'Error',
    errorCode: "500",
    errorContent: "Мы уже фиксим"
  }
};

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
})
