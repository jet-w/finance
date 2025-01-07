import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    {
      text: "Trading System",
      icon: "book",
      prefix: "finance/trading-system",
      children: "structure",
    },
  ],
});
