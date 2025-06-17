import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-imports.d.ts',
        vueTemplate: true,
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        deep: true,
        dts: 'src/components.d.ts',
        resolvers: [NaiveUiResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@stores': path.resolve(__dirname, 'src/stores'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@views': path.resolve(__dirname, 'src/views'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', 'json'],
    },
    build: {
      outDir: 'dist',
      assetsDir: 'static',
      sourcemap: !isProd,
      minify: 'esbuild',
      cssCodeSplit: true,
      manifest: true,

      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            naive: ['naive-ui'],
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
      terserOptions: {
        compress: {
          drop_debugger: isProd,
        },
      },
      optimizeDeps: {
        include: ['naive-ui', 'vue', 'vue-router', 'pinia'],
        exclude: [],
      },
    },
  }
})
