<script lang="ts">
  let { tokens, onSelect, selectedIndex } = $props<{ tokens: string[], onSelect: (index: number) => void, selectedIndex: number}>();
</script>

<p>
  {#each tokens as token, index (index)}
      <button
        class="word"
        class:active={index === selectedIndex}
        onclick={() => onSelect(index)}
      >
        {token.text}
      </button>
  {/each}
</p>
