import type { PartOfSpeech } from "@/lib/api/types";
import type { GrammarLanguage } from "@/lib/i18n/types";

const posLabels: Record<PartOfSpeech, Record<GrammarLanguage, string>> = {
  noun: { en: "Noun", sv: "Substantiv" },
  verb: { en: "Verb", sv: "Verb" },
  adjective: { en: "Adjective", sv: "Adjektiv" },
  adverb: { en: "Adverb", sv: "Adverb" },
  pronoun: { en: "Pronoun", sv: "Pronomen" },
  determiner: { en: "Determiner", sv: "Bestämmare" },
  conjunction: { en: "Conjunction", sv: "Konjunktion" },
  preposition: { en: "Preposition", sv: "Preposition" },
  interjection: { en: "Interjection", sv: "Interjektion" },
  numeral: { en: "Numeral", sv: "Räkneord" },
  auxiliary_verb: { en: "Auxiliary verb", sv: "Hjälpverb" },
  punctuation: { en: "Punctuation", sv: "Skiljetecken" },
};

export function posLabel(
  pos: PartOfSpeech,
  lang: GrammarLanguage = "en",
): string {
  return posLabels[pos][lang];
}
