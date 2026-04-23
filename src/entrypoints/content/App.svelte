<script lang="ts">
  import { type PopupStore } from "./popup-state.svelte";
  import type { Settings } from "@/lib/state/settings.svelte";
  import Popup from "@/lib/components/Popup.svelte";
  import WelcomeToast from "@/lib/components/WelcomeToast.svelte";

  let {
    popup,
    settings,
    openOptions,
  }: { popup: PopupStore; settings: Settings; openOptions: () => void } =
    $props();
</script>

{#if popup.current.state !== "hidden"}
  <Popup popupState={popup.current} {settings} />
{/if}
{#if !settings.welcomeMessageSeen}
  <WelcomeToast onDismiss={settings.setWelcomeMessageSeen} {openOptions} />
{/if}
