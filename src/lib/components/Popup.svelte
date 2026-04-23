<script lang="ts">
  import { fade } from "svelte/transition";
  import { TokenCard, TokenList } from "@/lib/components/token-card";
  import { MessageCircleQuestionMark, TriangleAlert } from "@lucide/svelte";
  import StatusHeader from "@/lib/components/common/StatusHeader.svelte";
  import type { Settings } from "@/lib/state/settings.svelte";
  import { type VisiblePopupState } from "@/entrypoints/content/popup-state.svelte";

  let {
    popupState,
    settings,
  }: { popupState: VisiblePopupState; settings: Settings } = $props();
</script>

<div
  class="rounded-box border-base-300 bg-base-100 fixed z-9999 w-87.5 border shadow-xl"
  style="top: {popupState.position.top}px; left: {popupState.position.left}px;"
>
  {#if popupState.state === "loading"}
    <div in:fade={{ duration: 100 }}>
      <TokenCard loading {settings} />
    </div>
  {:else if popupState.state === "loaded"}
    <div in:fade={{ duration: 100 }}>
      <TokenList tokens={popupState.tokens} {settings} />
    </div>
  {:else if popupState.state === "error" && popupState.errorType === "invalid"}
    <div class="px-4 py-6 text-center" in:fade={{ duration: 100 }}>
      <StatusHeader
        icon={MessageCircleQuestionMark}
        title="Unable to analyse"
      />
      <p class="text-base-content/50 mt-1 text-xs">
        No information available for this text.
      </p>
    </div>
  {:else if popupState.state === "error" && popupState.errorType === "unexpected"}
    <div class="px-4 py-6 text-center" in:fade={{ duration: 100 }}>
      <StatusHeader
        icon={TriangleAlert}
        title="Something went wrong"
        variant="error"
      />
      <p class="text-base-content/50 mt-1 text-xs">
        Unable to analyse the text.
      </p>
    </div>
  {/if}
</div>
