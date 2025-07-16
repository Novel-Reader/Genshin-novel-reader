import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 在开发环境下打开 index.html，在生产环境下进行打包

const basicConfig = {
  plugins: [react()],
  esbuild: {
    // 对 .js 和 .jsx 文件都应用 JSX 转换
    loader: 'jsx',
    // 仅对 .js 文件应用此 loader（.jsx 已默认支持）
    include: /\.[jt]sx?$/,
    // 排除 node_modules
    exclude: /node_modules/,
  },
  // 确保 .js 文件被视为 JSX 文件
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
};

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // 开发模式
    return {
      root: '.', // 以项目根目录为根
      server: {
        open: true, // 自动打开浏览器
      },
      ...basicConfig,
    };
  } else {
    // 构建模式(测试)
    return {
      build: {
        lib: {
          entry: 'src/app-container.js',
          name: 'MyApp',
          fileName: () => `app.js`,
          formats: ['es'],
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
      ...basicConfig,
    };
  }
});
