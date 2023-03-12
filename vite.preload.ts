// vite-plugin-preload.ts
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import path from 'path'
import { rollup, RollupOptions } from 'rollup'
import { Plugin } from 'vite'

export function vitePluginPreload(preloadPath: string, hook: string): Plugin {
  preloadPath = path.resolve(process.cwd(), preloadPath)

  async function buildPreload() {
    const options: RollupOptions = {
      input: preloadPath,
      output: {
        inlineDynamicImports: true,
        name: 'preload',
        file: './dist/preload.js',
        format: 'cjs',
      },
      plugins: [nodeResolve(), commonjs(), typescript()],
    }

    const bundle = await rollup(options)

    await bundle.write(options.output as any)
  }

  return {
    name: 'vite-plugin-preload',
    enforce: 'post',
    [hook]: async () => {
      await buildPreload()
    },
    async handleHotUpdate(ctx) {
      if (ctx.file === preloadPath) {
        await buildPreload()
      }
    },
  }
}

