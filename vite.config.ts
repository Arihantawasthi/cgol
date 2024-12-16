import { defineConfig } from "vite";

const noAttr = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html: any) {
      return html.replace(`type="module" crossorigin`, "");
    }
  }
}

export default defineConfig({
  plugins: [noAttr()],
  base: './',
})
