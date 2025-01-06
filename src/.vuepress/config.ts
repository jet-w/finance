import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";

import theme from "./theme.js";
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/finance/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Haiyue's Blog",
      description: "Haiyue's page",
    },
    //"/zh/": {
    //  lang: "zh-CN",
    //  title: "海越个人博客",
    //  description: "个人技术生活记录",
    //},
  },
  theme,
  alias: {
    //"@Test": path.resolve(__dirname, "components/test.vue"),
    "@Components": path.resolve(__dirname, "components"),
    "@JS": path.resolve(__dirname, "public/src/js"),
    "@MyChartjs": path.resolve(__dirname, "components/statistics/line_chart.vue"),
    "@HtmlEditor": path.resolve(__dirname, "components/html_editor.vue"),
    "@MindmapEditor": path.resolve(__dirname, "components/mindmap.vue"),
    //"@Book": path.resolve(__dirname, "components/book.vue"),
  },
  head: [
    ['script', {"async":"", src: 'https://www.googletagmanager.com/gtag/js?id=G-4BP2YK8NPN', type: "text/javascript"}],
    ['script', {src: '/src/gtag.js', type: "text/javascript"}],
  ]
  // Enable it with pwa
  // shouldPrefetch: false,
});
