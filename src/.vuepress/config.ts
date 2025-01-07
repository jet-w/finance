import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";

import theme from "./theme.js";
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/finance/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Financial Blog",
      description: "Financial Blog",
    },
    //"/zh/": {
    //  lang: "zh-CN",
    //  title: "海越个人博客",
    //  description: "个人技术生活记录",
    //},
  },
  theme,
  alias: {
    "@mermaid_preview": path.resolve(__dirname, "components/mermaid_convertor_preview.vue"),
  },
  head: [
    ['script', {"async":"", src: 'https://www.googletagmanager.com/gtag/js?id=G-4BP2YK8NPN', type: "text/javascript"}],
    ['script', {src: '/src/gtag.js', type: "text/javascript"}],
  ]
  // Enable it with pwa
  // shouldPrefetch: false,
});
