<script lang="ts">
  import { fade } from "svelte/transition";
  import { TokenCard, TokenList } from "@/lib/components/token-card";
  import { MessageCircleQuestionMark, TriangleAlert } from "@lucide/svelte";
  import StatusHeader from "@/lib/components/common/StatusHeader.svelte";
  import { type PopupStore } from "./popup-state.svelte";
  import type { Settings } from "@/lib/settings";

  let { popup, settings }: { popup: PopupStore; settings: Settings } = $props();
</script>

{#if popup.current.state !== "hidden"}
  <div
    class="rounded-box border-base-300 bg-base-100 fixed w-[350px] border shadow-xl z-9999"
    style="top: {popup.top}px; left: {popup.left}px;"
  >
    {#if popup.current.state === "loading"}
      <div in:fade={{ duration: 100 }}>
        <TokenCard loading {settings} />
      </div>
    {:else if popup.current.state === "tokens"}
      <div in:fade={{ duration: 100 }}>
        <TokenList tokens={popup.current.tokens} {settings} />
      </div>
    {:else if popup.current.state === "error" && popup.current.errorType === "invalid"}
      <div class="px-4 py-6 text-center" in:fade={{ duration: 100 }}>
        <StatusHeader
          icon={MessageCircleQuestionMark}
          title="Unable to analyse"
        />
        <p class="text-base-content/50 mt-1 text-xs">
          No information available for this text.
        </p>
      </div>
    {:else if popup.current.state === "error" && popup.current.errorType === "unexpected"}
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
{/if}
