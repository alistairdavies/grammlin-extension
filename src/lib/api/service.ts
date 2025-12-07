import createClient from "openapi-fetch";
import type { components, paths } from "./grammar_client";

const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_GRAMMAR_API_BASE_URL,
});

type NounToken = components["schemas"]["NounToken"];
type VerbToken = components["schemas"]["VerbToken"];
type PronounToken = components["schemas"]["PronounToken"];
type BaseToken = components["schemas"]["BaseToken"];

export type Token = NounToken | VerbToken | PronounToken | BaseToken;

export class LanguageNotSwedishError extends Error {
  constructor() {
    super("The text does not appear to be in Swedish");
    this.name = "LanguageNotSwedishError";
  }
}

export async function parseSentence(sentence: string): Promise<Token[]> {
  const { data, error, response } = await client.POST("/analyse", { body: { sentence } });

  if (error) {
    if (response.status === 422) {
      throw new LanguageNotSwedishError();
    }
    throw new Error("Unable to parse sentence");
  }

  return data.tokens;
}

export function isNoun(token: Token): token is NounToken {
  return token.part_of_speech?.id == "noun";
}

export function isVerb(token: Token): token is VerbToken {
  return (
    token.part_of_speech?.id == "verb" ||
    token.part_of_speech?.id == "auxiliary_verb"
  );
}

export function isPronoun(token: Token): token is PronounToken {
  return token.part_of_speech?.id == "pronoun";
}
