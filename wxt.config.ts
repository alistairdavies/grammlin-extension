import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-svelte"],
  svelte: { vite: { compilerOptions: { experimental: { async: true } } } },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    permissions: ["activeTab", "scripting", "storage"],
    action: {
      default_title: "Grammlin - Swedish Grammar Tool for learners",
      default_icon: {
        16: "icon-inactive/16.png",
        32: "icon-inactive/32.png",
        48: "icon-inactive/48.png",
      },
    },
    commands: {
      _execute_action: {
        suggested_key: {
          default: "Ctrl+Shift+G",
          mac: "Command+Shift+G",
        },
      },
    },
    web_accessible_resources: [
      {
        resources: ["content-scripts/content.css"],
        matches: ["<all_urls>"],
      },
    ],
  },
});
