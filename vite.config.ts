import react from '@vitejs/plugin-react-swc'
import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'
import { viteDelDev } from './vite.del-dev'
import { vitePluginPreload } from './vite.preload'

export default defineConfig(({ command }) => {
  const prePlugins =
    command === 'serve'
      ? [
          copy({
            hook: 'buildStart',
            verbose: false,
            targets: [
              {
                src: 'public/*',
                dest: 'dist',
              },
            ],
          }),
        ]
      : [viteDelDev()]
  return {
    base: './',
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: '',
        },
      ],
    },
    plugins: [
      ...prePlugins,
      vitePluginPreload(
        './src/preload.ts',
        command === 'serve' ? 'buildStart' : 'writeBundle'
      ),
      react(),
    ],
  }
})

