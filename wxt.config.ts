import tailwindcss from '@tailwindcss/vite'
// @ts-expect-error library types not available so ignore implicit any
import remToPx from '@thedutchcoder/postcss-rem-to-px'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  vite: () => ({
    css: { postcss: { plugins: [remToPx()] } },
    plugins: [tailwindcss()],
  }),
  manifest: {
    permissions: ['activeTab', 'scripting', 'storage'],
    action: {
      default_title: 'Grammlin - Swedish Grammar Tool for learners',
      default_icon: {
        16: 'icon-inactive/16.png',
        32: 'icon-inactive/32.png',
        48: 'icon-inactive/48.png',
      },
    },
    commands: {
      _execute_action: {},
    },
    browser_specific_settings: {
      gecko: {
        id: 'grammlin@alidav',
        data_collection_permissions: { required: ['websiteContent'] },
      },
    },
    web_accessible_resources: [
      {
        resources: ['content-scripts/content.css'],
        matches: ['<all_urls>'],
      },
    ],
  },
})
