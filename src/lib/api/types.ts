import type { components } from "./grammar_client";

export type PartOfSpeech = NonNullable<
  components["schemas"]["BaseToken"]["part_of_speech"]
>;

type NounMorphology = components["schemas"]["NounMorphology"];
type PronounMorphology = components["schemas"]["PronounMorphology"];
type VerbMorphology = components["schemas"]["VerbMorphology"];

export type MorphologyTag =
  | NonNullable<NounMorphology["gender"]>
  | NonNullable<NounMorphology["definiteness"]>
  | NonNullable<NounMorphology["plurality"]>
  | PronounMorphology["form"]
  | NonNullable<VerbMorphology["tense"]>
  | NonNullable<VerbMorphology["form"]>;

export type Definition = {
  translations: string[];
  definition: string | null;
};

export type Token = {
  text: string;
  lemma: string;
  pos: PartOfSpeech | null;
  definitions: Definition[];
  tags: MorphologyTag[];
};
