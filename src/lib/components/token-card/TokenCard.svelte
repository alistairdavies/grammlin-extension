<script lang="ts">
  import { type Token } from "@/lib/api/types";
  import type { Settings } from "@/lib/state/settings.svelte";
  import Badge from "@/lib/components/common/Badge.svelte";
  import TokenCardSkeleton from "./TokenCardSkeleton.svelte";
  import POSBadge from "@/lib/components/POSBadge.svelte";
  import { morphologyLabel } from "@/lib/i18n/morphology-labels";

  let {
    token,
    loading = false,
    settings,
  }: { token?: Token; loading?: boolean; settings: Settings } = $props();
</script>

<div class="card bg-base-100 transition-shadow">
  <div class="card-body p-4">
    {#if loading}
      <TokenCardSkeleton />
    {:else if token}
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 class="card-title mb-0 text-lg">{token.text}</h3>
          {#if token.compound_parts}
            <p class="text-base-content text-sm italic">
              {token.compound_parts.join(" | ")}
            </p>
          {/if}
        </div>
        {#if token.pos}
          <POSBadge pos={token.pos} {settings} />
        {/if}
      </div>
      {#if token.tags.length > 0}
        <div class="flex gap-1">
          {#each token.tags as tag, index (index)}
            <Badge
              text={morphologyLabel(tag, settings.grammarLanguage)}
              className="badge-neutral badge-outline"
            />
          {/each}
        </div>
      {/if}

      {#if token.definitions.length > 0}
        <div class="divide-base-200 mt-1 flex flex-col divide-y">
          {#each token.definitions as def, index (index)}
            <div class="flex gap-2.5 py-2.5 first:pt-1 last:pb-0">
              {#if token.definitions.length > 1}
                <span
                  class="text-base-content/35 w-4 shrink-0 pt-0.5 text-xs font-semibold tabular-nums"
                  >{index + 1}.</span
                >
              {/if}
              <div class="flex min-w-0 flex-1 flex-col gap-1.5">
                {#if def.definition}
                  <p class="text-base-content text-sm leading-snug">
                    {def.definition}
                  </p>
                {/if}
                {#if def.distinction}
                  <p
                    class="text-base-content/55 border-base-300 border-l-2 pl-2 text-xs leading-snug italic"
                  >
                    {def.distinction}
                  </p>
                {/if}
                {#if def.translations.length > 0}
                  <p class="text-base-content/60 text-sm leading-snug italic">
                    {def.translations.join(", ")}
                  </p>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    {/if}
  </div>
</div>
