<script lang="ts">
  let { tokens, onSelect, selectedIndex } = $props<{ tokens: string[], onSelect: (index: number) => void, selectedIndex: number}>();
</script>

<p class="flex flex-wrap gap-1">
  {#each tokens as token, index (index)}
    <button
      class:active={index === selectedIndex}
      onclick={() => onSelect(index)}
    >{token}</button>
  {/each}
</p>
