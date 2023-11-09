import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import babel from "@rollup/plugin-babel";
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/"),
    },
  },
  plugins: [vue()],
  build: {
    target: "es2015",
    lib: {
      entry: resolve(__dirname, "./src/package/storage/index.ts"),
      name: "storage",
      fileName: (format) => `storage.${format}.js`,
      formats: ["es", "umd"],
    },
    outDir: "dist",
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
      plugins: [
        babel({
          extensions: [".js", ".ts"],
          babelHelpers: "runtime",
          plugins: ["@babel/plugin-transform-runtime"],
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: false,
                targets: {
                  browsers: ["last 2 versions", "> 1%", "not ie <= 11"],
                },
              },
            ],
          ],
        }),
      ],
    },
    commonjsOptions: {
      esmExternals: true,
    },
  },
});
