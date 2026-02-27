import type { PartOfSpeech } from "@/lib/api/types";

const posColorVars: Record<PartOfSpeech, string> = {
  noun: "var(--pos-noun-bg)",
  verb: "var(--pos-verb-bg)",
  adverb: "var(--pos-adverb-bg)",
  pronoun: "var(--pos-pronoun-bg)",
  adjective: "var(--pos-adjective-bg)",
  preposition: "var(--pos-preposition-bg)",
  conjunction: "var(--pos-conjunction-bg)",
  determiner: "var(--pos-determiner-bg)",
  interjection: "var(--pos-interjection-bg)",
  numeral: "var(--pos-numeral-bg)",
  auxiliary_verb: "var(--pos-auxiliary_verb-bg)",
};

export function posColor(pos: PartOfSpeech | null): string {
  return pos ? posColorVars[pos] : "var(--pos-default-bg)";
}
