import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      text: "Models",
      icon: "list-check",
      prefix: "models/",
      children: "structure",
    },
    {
      text: "Techniques",
      icon: "book",
      prefix: "techniques/",
      children: "structure",
    },
    {
      text: "Work",
      icon: "list-check",
      prefix: "work/",
      children: "structure",
    },
    {
      text: "Study",
      icon: "list-check",
      prefix: "study/",
      children: "structure",
    },
    "intro"
  ],
});
