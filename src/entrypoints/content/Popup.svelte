<script lang="ts">
  import TokenCard from "@/lib/components/TokenCard.svelte";
  import { MessageCircleQuestionMark, TriangleAlert } from "@lucide/svelte";
  import StatusHeader from "@/lib/components/common/StatusHeader.svelte";
  import {
    getPopupState,
    getPosition,
    getActiveTokenIndex,
    setActiveTokenIndex,
  } from "./popup-state.svelte";

  let popupState = $derived(getPopupState());
  let position = $derived(getPosition());
  let selectedTokenIndex = $derived(getActiveTokenIndex());
</script>

{#if popupState.type !== "hidden"}
  <div
    class="fixed w-[350px] rounded-box border border-base-300 bg-base-100 shadow-xl"
    style="top: {position.top}px; left: {position.left}px;"
  >
    {#if popupState.type === "loading"}
      <div class="flex items-center justify-center p-6">
        <span class="loading loading-spinner loading-md text-primary"></span>
      </div>
    {:else if popupState.type === "tokens"}
      {#if popupState.tokens.length > 1}
        <div class="flex flex-wrap gap-1 border-b border-base-300 px-3 pt-3 pb-2">
          {#each popupState.tokens as token, i (i)}
            <button
              class="badge badge-sm cursor-pointer {i === selectedTokenIndex
                ? 'badge-primary'
                : 'badge-ghost'}"
              onclick={() => setActiveTokenIndex(i)}
            >
              {token.text}
            </button>
          {/each}
        </div>
      {/if}
      <div class="p-0">
        <TokenCard token={popupState.tokens[selectedTokenIndex]} />
      </div>
    {:else if popupState.type === "error" && popupState.errorType === "invalid"}
      <div class="px-4 py-6 text-center">
        <StatusHeader icon={MessageCircleQuestionMark} title="Unable to analyse" />
        <p class="text-base-content/50 mt-1 text-xs">
          No information available for this text.
        </p>
      </div>
    {:else if popupState.type === "error" && popupState.errorType === "unexpected"}
      <div class="px-4 py-6 text-center">
        <StatusHeader icon={TriangleAlert} title="Something went wrong" variant="error" />
        <p class="text-base-content/50 mt-1 text-xs">
          Unable to analyse the text.
        </p>
      </div>
    {/if}
  </div>
{/if}
