import type { components } from "./grammar_client";
import type { Token } from "./types";

type TokenResponse = components["schemas"]["AnalyseResponse"]["tokens"][number];

export function serialiseTokens(
  tokens: components["schemas"]["AnalyseResponse"]["tokens"],
): Token[] {
  return tokens.map(serialiseToken);
}

function serialiseToken(token: TokenResponse): Token {
  const tags =
    "morphology" in token ? serialiseMorphology(token.morphology) : [];

  return {
    text: token.text,
    pos: token.part_of_speech,
    definitions: serialiseDefinitions(token.definitions),
    tags,
  };
}

function serialiseMorphology(morphology: Record<string, unknown>): string[] {
  return Object.values(morphology).filter(
    (value): value is string => typeof value === "string",
  );
}

function serialiseDefinitions(
  definitions?: components["schemas"]["Definition"][],
): string[] {
  return (
    definitions
      ?.map((def) => def.definition)
      .filter((d): d is string => d != null) ?? []
  );
}
