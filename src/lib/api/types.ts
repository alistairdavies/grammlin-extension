import type { components } from "./grammar_client";

type PartOfSpeech = components["schemas"]["PartOfSpeech"];

export type Token = {
  text: string;
  pos: PartOfSpeech | null;
  definitions: string[];
  tags: string[];
};
