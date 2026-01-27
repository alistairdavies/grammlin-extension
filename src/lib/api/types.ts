import type { components } from "./grammar_client";

export type PartOfSpeech = NonNullable<
  components["schemas"]["BaseToken"]["part_of_speech"]
>;

export type Token = {
  text: string;
  pos: PartOfSpeech | null;
  definitions: string[];
  tags: string[];
};
