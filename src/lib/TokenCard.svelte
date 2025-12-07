<script lang="ts">
    import { type Token } from "./api/types";
    import Badge, { type BadgeVariant } from "./components/Badge.svelte";
  let { token } = $props<{ token: Token }>();

  let expanded = $state(false);

  function getPOSColor(pos: Token["pos"]): BadgeVariant {
    switch (pos?.id) {
      case "verb":
        return "blue"
      case "noun":
        return "red"
      case "adjective":
        return "green"
      case "pronoun":
        return "amber"
      case "adverb":
        return "purple"
      case "conjunction":
        return "yellow"
      default:
        return "gray"
    }
  }
</script>

<div class="card bg-base-100 border border-base-300 hover:shadow-md transition-shadow">
  <div class="card-body p-3.5">
    <div class="flex items-start justify-between gap-2 mb-2">
      <h3 class="card-title text-lg mb-0">{token.text}</h3>
    </div>
    <div class="flex flex-wrap gap-2 mb-2">
      {#if token.pos }
        <Badge text={token.pos.title} variant={ getPOSColor(token.pos)} />
      {/if}
      {#each token.tags as tag }
        <Badge text={tag} />
      {/each}
    </div>

    {#if token.definitions.length > 0}
      <p class="text-sm italic text-base-content/70 leading-relaxed text-left">
        {token.definitions[0]}
      </p>

      {#if token.definitions.length > 1}
        <button
          onclick={() => expanded = !expanded}
          class="text-xs text-primary hover:text-primary-focus mt-2 flex items-center gap-1 text-left"
        >
          <span class="font-mono">{expanded ? '−' : '+'}</span>
          <span>{token.definitions.length - 1} other {token.definitions.length === 2 ? 'meaning' : 'meanings'}</span>
        </button>

        {#if expanded}
          <div class="border-t border-base-300 mt-2 pt-2 space-y-1.5">
            {#each token.definitions.slice(1) as def}
              <p class="text-sm italic text-base-content/50 leading-relaxed text-left">{def}</p>
            {/each}
          </div>
        {/if}
      {/if}
    {/if}
  </div>
</div>
