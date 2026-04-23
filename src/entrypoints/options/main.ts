import { mount } from "svelte";
import App from "./App.svelte";
import "./style.css";
import { loadSettings } from "@/lib/state/settings.svelte";

const shortcuts = await browser.commands.getAll();
const executeActionShortcut = shortcuts.find((shortcut) => {
  return shortcut.name === "_execute_action";
});

const settings = await loadSettings();

mount(App, {
  target: document.getElementById("app")!,
  props: {
    settings,
    executeShortcut: executeActionShortcut?.shortcut,
  },
});
