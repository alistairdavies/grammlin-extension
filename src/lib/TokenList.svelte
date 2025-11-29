<script lang="ts">
  import { fly } from "svelte/transition";
  import TokenCard from "./TokenCard.svelte";

  let { tokens } = $props();
</script>

<ul class="w-full list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each tokens as token}
    <li transition:fly={{ y: 200, duration: 500 }} class="flex">
      <TokenCard {token} />
    </li>
  {/each}
</ul>
