import { mount } from "svelte";
import App from "./App.svelte";
import "./style.css";
import { loadSettings } from "@/lib/state/settings.svelte";

const settings = await loadSettings();
mount(App, { target: document.getElementById("app")!, props: { settings } });
