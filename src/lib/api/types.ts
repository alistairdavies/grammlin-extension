import type { components } from "./grammar_client";

export type PartOfSpeech = NonNullable<
  components["schemas"]["BaseToken"]["part_of_speech"]
>;

export type Definition = {
  translations: string[];
  definition: string | null;
};

export type Token = {
  text: string;
  lemma: string;
  pos: PartOfSpeech | null;
  definitions: Definition[];
  tags: string[];
};
