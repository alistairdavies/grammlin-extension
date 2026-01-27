<script lang="ts">
  import type { PartOfSpeech } from "@/lib/api/types";
  import { posLabel } from "@/lib/i18n/pos-labels";
  import Badge from "@/lib/components/common/Badge.svelte";

  let { pos }: { pos: PartOfSpeech } = $props();

  const posStyles: Record<PartOfSpeech, string> = {
    noun: "bg-[var(--pos-noun-bg)] text-[var(--pos-noun-text)]",
    verb: "bg-[var(--pos-verb-bg)] text-[var(--pos-verb-text)]",
    adverb: "bg-[var(--pos-adverb-bg)] text-[var(--pos-adverb-text)]",
    pronoun: "bg-[var(--pos-pronoun-bg)] text-[var(--pos-pronoun-text)]",
    adjective: "bg-[var(--pos-adjective-bg)] text-[var(--pos-adjective-text)]",
    preposition: "bg-[var(--pos-preposition-bg)] text-[var(--pos-preposition-text)]",
    conjunction: "bg-[var(--pos-conjunction-bg)] text-[var(--pos-conjunction-text)]",
    determiner: "bg-[var(--pos-determiner-bg)] text-[var(--pos-determiner-text)]",
    interjection: "bg-[var(--pos-interjection-bg)] text-[var(--pos-interjection-text)]",
    numeral: "bg-[var(--pos-numeral-bg)] text-[var(--pos-numeral-text)]",
    auxiliary_verb: "bg-[var(--pos-auxiliary_verb-bg)] text-[var(--pos-auxiliary_verb-text)]",
    punctuation: "bg-[var(--pos-punctuation-bg)] text-[var(--pos-punctuation-text)]",
  };
</script>

<Badge text={posLabel(pos)} className={posStyles[pos]} />
