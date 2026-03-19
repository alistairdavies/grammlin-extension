<script lang="ts">
  import { type Token } from "@/lib/api/types";
  import Badge from "@/lib/components/common/Badge.svelte";
  import POSBadge from "@/lib/components/POSBadge.svelte";
  import { morphologyLabel } from "@/lib/i18n/morphology-labels";
  import { getGrammarLanguage } from "@/lib/settings.svelte";
  let { token }: { token: Token } = $props();
</script>

<div
  class="card bg-base-100 border-accent/25 border transition-shadow hover:shadow-md"
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
          <Badge
            text={morphologyLabel(tag, getGrammarLanguage())}
            className="badge-neutral badge-outline"
          />
        {/each}
      </div>
    {/if}

    {#if token.definitions.length > 0}
      <div class="divide-base-300 mt-2 divide-y">
        {#each token.definitions as def, index (index)}
          <div class="py-2 first:pt-0 last:pb-0">
            {#if def.definition}
              <p
                class="text-base-content text-left text-sm leading-relaxed italic"
              >
                {def.definition}
              </p>
            {/if}
            <p class="text-base-content/60 text-left text-sm leading-relaxed">
              {def.translations.join(", ")}
            </p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
