import type { components } from "./grammar_client";
import { Token } from "./types";

type TokenResponse = components["schemas"]["AnalyseResponse"]["tokens"][number];
type NounToken = components["schemas"]["NounToken"];
type PronounToken = components["schemas"]["PronounToken"];
type VerbToken = components["schemas"]["VerbToken"];

export function serialiseTokens(
  tokens: components["schemas"]["AnalyseResponse"]["tokens"],
): Token[] {
  return tokens.map(serialiseToken);
}

function serialiseNounMorphology(
  morphology: components["schemas"]["NounMorphology"],
): string[] {
  const tags: string[] = [];
  if (morphology.plurality) tags.push(morphology.plurality);
  if (morphology.definiteness) tags.push(morphology.definiteness);
  if (morphology.gender) {
    tags.push(morphology.gender === "common" ? "en word" : "ett word");
  }
  return tags;
}

function serialiseVerbMorphology(
  morphology: components["schemas"]["VerbMorphology"],
): string[] {
  const tags: string[] = [];
  if (morphology.tense) tags.push(morphology.tense);
  if (morphology.form) tags.push(morphology.form);
  return tags;
}

function serialisePronounMorphology(
  morphology: components["schemas"]["PronounMorphology"],
): string[] {
  const tags: string[] = [];
  if (morphology.form) tags.push(morphology.form);
  return tags;
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

function serialiseToken(token: TokenResponse): Token {
  let tags: string[] = [];

  if (isNoun(token)) {
    tags = serialiseNounMorphology(token.morphology);
  } else if (isVerb(token)) {
    tags = serialiseVerbMorphology(token.morphology);
  } else if (isPronoun(token)) {
    tags = serialisePronounMorphology(token.morphology);
  }

  return {
    text: token.text,
    pos: token.part_of_speech,
    definitions: serialiseDefinitions(token.definitions),
    tags: tags,
  };
}

function isNoun(token: TokenResponse): token is NounToken {
  return token.part_of_speech?.id == "noun";
}

function isVerb(token: TokenResponse): token is VerbToken {
  return (
    token.part_of_speech?.id == "verb" ||
    token.part_of_speech?.id == "auxiliary_verb"
  );
}

function isPronoun(token: TokenResponse): token is PronounToken {
  return token.part_of_speech?.id == "pronoun";
}
