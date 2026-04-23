<script lang="ts">
  import { type PopupStore } from "./popup-state.svelte";
  import type { Settings } from "@/lib/state/settings.svelte";
  import Popup from "@/lib/components/Popup.svelte";
  import WelcomeToast from "@/lib/components/WelcomeToast.svelte";

  let { popup, settings }: { popup: PopupStore; settings: Settings } = $props();
</script>

{#if popup.current.state !== "hidden"}
  <Popup popupState={popup.current} {settings} />
{/if}
{#if !settings.welcomeMessageSeen}
  <WelcomeToast onDismiss={settings.setWelcomeMessageSeen} />
{/if}
