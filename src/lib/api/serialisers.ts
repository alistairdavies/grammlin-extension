import type { components } from "./grammar_client";
import type { Token, Definition, MorphologyTag } from "./types";

type TokenResponse = components["schemas"]["AnalyseResponse"]["tokens"][number];

export function serialiseTokens(
  tokens: components["schemas"]["AnalyseResponse"]["tokens"],
): Token[] {
  return tokens.map(serialiseToken);
}

export function serialiseToken(token: TokenResponse): Token {
  const tags =
    "morphology" in token ? serialiseMorphology(token.morphology) : [];

  return {
    text: token.text,
    lemma: token.lemma,
    pos: token.part_of_speech,
    definitions: serialiseDefinitions(token.definitions),
    tags,
  };
}

export function serialiseMorphology(
  morphology: Record<string, unknown>,
): MorphologyTag[] {
  return Object.values(morphology).filter(
    (value): value is MorphologyTag => typeof value === "string",
  );
}

export function serialiseDefinitions(
  definitions?: components["schemas"]["Definition"][],
): Definition[] {
  return (
    definitions?.map((def) => ({
      translations: def.translations,
      definition: def.definition ?? null,
    })) ?? []
  );
}
