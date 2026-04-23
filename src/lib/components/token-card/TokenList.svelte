<script lang="ts">
  import { type Token } from "@/lib/api/types";
  import type { Settings } from "@/lib/state/settings.svelte";
  import { posColor } from "@/lib/components/pos-colours";
  import TokenCard from "./TokenCard.svelte";

  let { tokens, settings }: { tokens: Token[]; settings: Settings } = $props();

  let activeIndex = $state(0);
</script>

{#if tokens.length > 1}
  <div class="border-base-300 flex flex-wrap gap-3 border-b px-3 pt-3 pb-2">
    {#each tokens as token, i (i)}
      <button
        class="cursor-pointer text-sm {i === activeIndex
          ? 'font-medium'
          : 'opacity-75 hover:opacity-100'}"
        style="color: {posColor(token.pos)}"
        onclick={() => (activeIndex = i)}
      >
        {token.text}
      </button>
    {/each}
  </div>
{/if}
<div class="p-3">
  <TokenCard token={tokens[activeIndex]} {settings} />
</div>
