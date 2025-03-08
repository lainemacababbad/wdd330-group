import { resolve } from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resourceLimits } from "worker_threads";



export default defineConfig({
  plugins: [svelte()],
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        order: resolve(__dirname, "src/orders/index.html"),
        login: resolve(__dirname, "src/login/index.html"),
        product1: resolve(
          __dirname,
          "src/product_pages/cedar-ridge-rimrock-2.html"
        ),
        product2: resolve(__dirname, "src/product_pages/marmot-ajax-3.html"),
        product3: resolve(
          __dirname,
          "src/product_pages/northface-alpine-3.html"
        ),
        product4: resolve(
          __dirname,
          "src/product_pages/northface-talus-4.html"
        ),
      },
    },
  },
});

