import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';

const { resolve } = require('path'); // 编辑器提示 path 模块找不到，可以yarn add @types/node --dev

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const LODE_ENV = loadEnv(mode, process.cwd());
  for (const k in LODE_ENV) {
    process.env[k] = LODE_ENV[k];
  }

  return defineConfig({
    plugins: [vue(), visualizer({
      emitFile: false,
      filename: 'report.html', // 分析图生成的文件名
      open: false, // 如果存在本地服务端口，将在打包后自动展示
    })],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
      },
    },
    // 开发或生产环境服务的公共基础路径 默认 '/'
    base: process.env.VITE_BASE_URL,
    server: {
      host: process.env.VITE_BASE_HOST,
      port: Number(process.env.VITE_URL_PORT),
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: process.env.VITE_BASE_PROXY_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      outDir: 'dist', // 打包文件名称
      assetsDir: 'assets', // 打包静态文件的存储地址
      rollupOptions: {
        output: {
          entryFileNames: () => 'js/[name].[hash].js',
          assetFileNames: () => '[ext]/[name].[hash].[ext]',
          chunkFileNames: (chunkInfo: any) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
            if (facadeModuleId.length === 0) return 'ts/[name].[hash].js';
            const fileName = facadeModuleId.find(directory => directory.includes('index')) ? facadeModuleId[facadeModuleId.length - 2] : '[name]';
            return `js/${ fileName }.[hash].js`;
          },
          manualChunks(id: any) {
            if (id.includes('node_modules') && id.includes('vue')) {
              return 'vue';
            } if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  });
};
