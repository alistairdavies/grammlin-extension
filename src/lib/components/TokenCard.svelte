<script lang="ts">
  import { type Token } from "@/lib/api/types";
  import Badge, {
    type BadgeVariant,
  } from "@/lib/components/common/Badge.svelte";
  let { token } = $props<{ token: Token }>();

  let expanded = $state(false);

  function getPOSColor(pos: Token["pos"]): BadgeVariant {
    switch (pos?.id) {
      case "verb":
        return "blue";
      case "noun":
        return "green";
      case "adjective":
        return "red";
      case "pronoun":
        return "purple";
      case "adverb":
        return "amber";
      case "conjunction":
        return "yellow";
      case "determiner":
        return "turqouise";
      case "preposition":
        return "lime";
      case "auxiliary_verb":
        return "navy";
      default:
        return "gray";
    }
  }
</script>

<div
  class="card bg-base-100 border border-gray-300 transition-shadow hover:shadow-md"
>
  <div class="card-body p-3.5">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h3 class="card-title mb-0 text-lg">{token.text}</h3>
      {#if token.pos}
        <Badge text={token.pos.title} variant={getPOSColor(token.pos)} />
      {/if}
    </div>
    {#if token.tags.length > 0}
      <div class="flex gap-1">
        {#each token.tags as tag, index (index)}
          <Badge text={tag} />
        {/each}
      </div>
    {/if}

    {#if token.definitions.length > 0}
      <p
        class="text-base-content/70 mt-2 text-left text-sm leading-relaxed italic"
      >
        {token.definitions[0]}
      </p>

      {#if token.definitions.length > 1}
        <button
          onclick={() => (expanded = !expanded)}
          class="text-primary hover:text-primary-focus mt-2 flex items-center gap-1 text-left text-sm hover:cursor-pointer"
        >
          <span class="font-mono">{expanded ? "−" : "+"}</span>
          <span
            >{token.definitions.length - 1} other {token.definitions.length ===
            2
              ? "meaning"
              : "meanings"}</span
          >
        </button>

        {#if expanded}
          <div class="border-base-300 mt-2 space-y-1.5 border-t pt-2">
            {#each token.definitions.slice(1) as def, index (index)}
              <p
                class="text-base-content/70 text-left text-sm leading-relaxed italic"
              >
                {def}
              </p>
            {/each}
          </div>
        {/if}
      {/if}
    {/if}
  </div>
</div>
