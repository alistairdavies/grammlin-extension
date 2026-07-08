<script lang="ts">
  import FeedbackToast from '@/lib/components/FeedbackToast.svelte'
  import Popup from '@/lib/components/Popup.svelte'
  import WelcomeToast from '@/lib/components/WelcomeToast.svelte'
  import type { Settings } from '@/lib/state/settings.svelte'
  import type { PopupStore } from './popup-state.svelte'

  let {
    popup,
    settings,
    openOptions,
  }: { popup: PopupStore; settings: Settings; openOptions: () => void } =
    $props()
</script>

{#if popup.current.state !== "hidden"}
  <Popup popupState={popup.current} {settings} />
{/if}
{#if settings.showWelcomeMessage}
  <WelcomeToast onDismiss={settings.setWelcomeMessageSeen} {openOptions} />
{:else if settings.showFeedbackMessage}
  <FeedbackToast onDismiss={settings.setFeedbackMessageSeen} />
{/if}
