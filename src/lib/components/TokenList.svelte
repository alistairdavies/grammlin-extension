<script lang="ts">
  import { fly } from "svelte/transition";
  import TokenCard from "@/lib/components/TokenCard.svelte";
  import { type Token } from "@/lib/api/types";

  let {
    tokens,
    selectedIndex = null,
  }: {
    tokens: Token[];
    selectedIndex?: number | null;
  } = $props();
</script>

<div class="m-2 flex flex-col gap-2 py-2">
  {#each tokens as token, index (index)}
    <div
      id="token-{index}"
      class="scroll-mt-32 rounded-xl transition-shadow duration-300 {index ===
      selectedIndex
        ? 'ring-accent ring-2'
        : ''}"
      transition:fly={{ x: -200, duration: 500 }}
    >
      <TokenCard {token} />
    </div>
  {/each}
</div>
