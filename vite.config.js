import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const basicConfig = {
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /\.[jt]sx?$/,
    exclude: /node_modules/,
  },
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
    return {
      root: '.',
      server: {
        open: true,
      },
      ...basicConfig,
    };
  } else {
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
