<script lang="ts">
  import type { PartOfSpeech } from "@/lib/api/types";
  import { posLabel } from "@/lib/i18n/pos-labels";
  import { posColor } from "@/lib/components/pos-colours";
  import Badge from "@/lib/components/common/Badge.svelte";
  import { getGrammarLanguage } from "@/lib/settings.svelte";

  let { pos }: { pos: PartOfSpeech } = $props();
</script>

<Badge text={posLabel(pos, getGrammarLanguage())} className="text-base-100" style="background-color: {posColor(pos)}" />
