import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import utools from 'vite-plugin-utools'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // ant design 4.17 版本会有 less 报错，添加这个处理，之后版本看是否需要移除该项
          // 相关链接：https://githubmemory.com/repo/ant-design/ant-design-pro/issues/9082
          'root-entry-name': 'default',
        },
      },
    },
  },
  plugins: [
    react(),
    utools({
      external: 'uTools',
      preload: {
        path: './src/preload.ts',
        watch: true,
        name: 'window.preload',
      },
      buildUpx: false,
    }),
  ],
  build: {
    outDir: '/mnt/c/code/utools/mossgpt',
    emptyOutDir: true
  },
})

