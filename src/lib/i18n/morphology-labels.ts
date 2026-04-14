import type { MorphologyTag } from "@/lib/api/types";
import type { GrammarLanguage } from "@/lib/settings";

const morphologyLabels: Record<
  MorphologyTag,
  Record<GrammarLanguage, string>
> = {
  positive: { en: "basic form", sv: "positiv" },
  comparative: { en: "comparative", sv: "komparativ" },
  superlative: { en: "superlative", sv: "superlativ" },
  common: { en: "en word", sv: "en-ord" },
  neuter: { en: "ett word", sv: "ett-ord" },
  definite: { en: "definite", sv: "bestämd" },
  indefinite: { en: "indefinite", sv: "obestämd" },
  singular: { en: "singular", sv: "singular" },
  plural: { en: "plural", sv: "plural" },
  object: { en: "object", sv: "objekt" },
  possessive: { en: "possessive", sv: "possessiv" },
  subject: { en: "subject", sv: "subjekt" },
  "past tense": { en: "past tense", sv: "preteritum" },
  "present tense": { en: "present tense", sv: "presens" },
  infinitive: { en: "infinitive", sv: "infinitiv" },
  supine: { en: "supine", sv: "supinum" },
  imperative: { en: "imperative", sv: "imperativ" },
};

export function morphologyLabel(
  value: MorphologyTag,
  lang: GrammarLanguage = "en",
): string {
  return morphologyLabels[value][lang];
}
