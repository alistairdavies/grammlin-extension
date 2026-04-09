import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-svelte"],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    permissions: ["activeTab", "scripting"],
    action: {
      default_title: "Grammlin - Swedish Grammar Tool for learners",
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
