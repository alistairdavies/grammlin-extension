import type { PartOfSpeech } from "@/lib/api/types";

const posLabels: Record<PartOfSpeech, string> = {
  noun: "Noun",
  numeral: "Numeral",
  verb: "Verb",
  auxiliary_verb: "Auxiliary verb",
  adjective: "Adjective",
  adverb: "Adverb",
  pronoun: "Pronoun",
  determiner: "Determiner",
  conjunction: "Conjunction",
  preposition: "Preposition",
  interjection: "Interjection",
  punctuation: "Punctuation",
};

export function posLabel(pos: PartOfSpeech): string {
  return posLabels[pos];
}
