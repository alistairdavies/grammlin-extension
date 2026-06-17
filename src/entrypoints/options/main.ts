import { mount } from 'svelte'
import App from './App.svelte'
import './style.css'
import { loadSettings } from '@/lib/state/settings.svelte'

const shortcuts = await browser.commands.getAll()
const executeActionShortcut = shortcuts.find((shortcut) => {
  return shortcut.name === '_execute_action'
})

const settings = await loadSettings()

const mountTarget = document.getElementById('app')
if (!mountTarget) {
  throw new Error('Unable to find element to mount options panel')
}

mount(App, {
  target: mountTarget,
  props: {
    settings,
    executeShortcut: executeActionShortcut?.shortcut,
  },
})
