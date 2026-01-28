<script lang="ts">
  import type { PartOfSpeech } from "@/lib/api/types";
  import { posLabel } from "@/lib/i18n/pos-labels";
  import Badge from "@/lib/components/common/Badge.svelte";

  let { pos }: { pos: PartOfSpeech } = $props();

  const posStyles: Record<PartOfSpeech, string> = {
    noun: "bg-[var(--pos-noun-bg)]",
    verb: "bg-[var(--pos-verb-bg)]",
    adverb: "bg-[var(--pos-adverb-bg)]",
    pronoun: "bg-[var(--pos-pronoun-bg)]",
    adjective: "bg-[var(--pos-adjective-bg)]",
    preposition: "bg-[var(--pos-preposition-bg)]",
    conjunction: "bg-[var(--pos-conjunction-bg)]",
    determiner: "bg-[var(--pos-determiner-bg)]",
    interjection: "bg-[var(--pos-interjection-bg)]",
    numeral: "bg-[var(--pos-numeral-bg)]",
    auxiliary_verb: "bg-[var(--pos-auxiliary_verb-bg)]",
    punctuation: "bg-[var(--pos-punctuation-bg)]",
  };
</script>

<Badge text={posLabel(pos)} className="{posStyles[pos]} text-base-100" />
