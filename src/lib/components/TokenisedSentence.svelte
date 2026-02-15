<script lang="ts">
  import type { Token } from "@/lib/api/types";
  import { posColor } from "@/lib/components/pos-colours";

  let {
    tokens,
    onSelect,
  }: {
    tokens: Token[];
    onSelect: (index: number) => void;
  } = $props();
</script>

<div class="bg-base-100 border-base-300 sticky top-0 z-10 max-h-28 overflow-y-auto border-b px-4 pb-5 pt-4">
  <p class="flex flex-wrap gap-2">
    {#each tokens as token, index (index)}
      <button
        class="text-base-content cursor-pointer rounded border-b-4 px-1.5 py-1 text-base transition-all hover:bg-base-200 hover:shadow-sm"
        style="border-bottom-color: {posColor(token.pos)}"
        onclick={() => onSelect(index)}
      >
        {token.text}
      </button>
    {/each}
  </p>
</div>
