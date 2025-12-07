<script lang="ts">
  import { fly } from "svelte/transition";
  import TokenCard from "./TokenCard.svelte";
  import { type Token } from "./api/service"

  let { tokens } = $props<{ tokens: Token[] }>();
</script>

<div class="flex flex-col gap-2 m-2">
  {#each tokens as token}
    <div  transition:fly={{ x: -200, duration: 500 }}>
      <TokenCard {token} />
    </div>
  {/each}
</div>

