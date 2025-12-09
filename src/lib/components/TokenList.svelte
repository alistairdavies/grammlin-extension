<script lang="ts">
  import { fly } from "svelte/transition";
  import TokenCard from "@/lib/components/TokenCard.svelte";
  import { type Token } from "@/lib/api/types";

  let { tokens } = $props<{ tokens: Token[] }>();
</script>

<div class="flex flex-col gap-2 m-2">
  {#each tokens as token}
    <div  transition:fly={{ x: -200, duration: 500 }}>
      <TokenCard {token} />
    </div>
  {/each}
</div>

