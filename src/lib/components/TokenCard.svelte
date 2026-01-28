<script lang="ts">
  import { type Token } from "@/lib/api/types";
  import Badge from "@/lib/components/common/Badge.svelte";
  import POSBadge from "@/lib/components/POSBadge.svelte";
    import { morphologyLabel } from "../i18n/morphology-labels";
  let { token }: { token: Token } = $props();

  let expanded = $state(false);
</script>

<div
  class="card bg-base-100 border border-base-300 transition-shadow hover:shadow-md"
>
  <div class="card-body p-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h3 class="card-title mb-0 text-lg">{token.text}</h3>
      {#if token.pos}
        <POSBadge pos={token.pos} />
      {/if}
    </div>
    {#if token.tags.length > 0}
      <div class="flex gap-1">
        {#each token.tags as tag, index (index)}
          <Badge text={morphologyLabel(tag)} className="badge-neutral badge-outline"/>
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
          <div class="border-base-300 mt-2 space-y-2 border-t pt-2">
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
