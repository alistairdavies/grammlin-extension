import { describe, expect, it } from "vitest";
import {
  serialiseTokens,
  serialiseToken,
  serialiseMorphology,
  serialiseDefinitions,
} from "./serialisers";
import type { components } from "./grammar_client";

type ApiTokens = components["schemas"]["AnalyseResponse"]["tokens"];

describe("serialiseTokens", () => {
  it("serialises the given tokens", () => {
    const input: ApiTokens = [
      {
        text: "Jag",
        lemma: "jag",
        part_of_speech: "pronoun",
        morphology: { form: "subject" },
      },
      { text: "och", lemma: "och", part_of_speech: "conjunction" },
    ];

    const result = serialiseTokens(input);

    expect(result).toEqual(input.map(serialiseToken));
  });
});

describe("serialiseToken", () => {
  const exampleToken: ApiTokens[number] = {
    text: "",
    lemma: "",
    part_of_speech: "conjunction",
  };

  it("returns unmodified token data", () => {
    const input = { ...exampleToken, text: "someText", lemma: "someLemma" };

    const result = serialiseToken(input);

    expect(result).toMatchObject({
      text: "someText",
      lemma: "someLemma",
      pos: "conjunction",
    });
  });

  it("sets pos to null for a token with no part of speech tag", () => {
    const input = { ...exampleToken, part_of_speech: null };

    const result = serialiseToken(input);

    expect(result.pos).toBeNull();
  });

  it("returns empty tags for a token with no morphology information", () => {
    const input = { ...exampleToken };

    const result = serialiseToken(input);

    expect(result.tags).toEqual([]);
  });

  it("extracts morphology values as tags", () => {
    const input = {
      ...exampleToken,
      morphology: {
        gender: "neuter",
        definiteness: "definite",
        plurality: "singular",
      },
    };

    const result = serialiseToken(input);

    expect(result.tags).toEqual(["neuter", "definite", "singular"]);
  });

  it("returns empty definitions when definitions are omitted", () => {
    const input: ApiTokens[number] = {
      text: ".",
      lemma: ".",
      part_of_speech: null,
    };

    const result = serialiseToken(input);

    expect(result.definitions).toEqual([]);
  });
});

describe("serialiseMorphology", () => {
  it("returns string values as tags", () => {
    const input = { gender: "neuter", definiteness: "definite" };

    const result = serialiseMorphology(input);

    expect(result).toEqual(["neuter", "definite"]);
  });

  it("filters out null values", () => {
    const input = { gender: "neuter", definiteness: null, plurality: null };

    const result = serialiseMorphology(input);

    expect(result).toEqual(["neuter"]);
  });

  it("returns an empty array when all values are null", () => {
    const input = { tense: null, form: null };

    const result = serialiseMorphology(input);

    expect(result).toEqual([]);
  });
});

describe("serialiseDefinitions", () => {
  it("returns an empty array when definitions are undefined", () => {
    const result = serialiseDefinitions(undefined);

    expect(result).toEqual([]);
  });

  it("returns an empty array given an empty list", () => {
    const result = serialiseDefinitions([]);

    expect(result).toEqual([]);
  });

  it("maps translations and definition text", () => {
    const input = [
      { translations: ["dog", "hound"], definition: "a domestic animal" },
    ];

    const result = serialiseDefinitions(input);

    expect(result).toEqual([
      { translations: ["dog", "hound"], definition: "a domestic animal" },
    ]);
  });

  it("normalises undefined definition text to null", () => {
    const input = [{ translations: ["dog"] }];

    const result = serialiseDefinitions(input);

    expect(result[0].definition).toBeNull();
  });

  it("handles multiple definitions", () => {
    const input = [
      { translations: ["dish"], definition: "a food course" },
      { translations: ["right", "correct"], definition: null },
    ];

    const result = serialiseDefinitions(input);

    expect(result).toEqual([
      { translations: ["dish"], definition: "a food course" },
      { translations: ["right", "correct"], definition: null },
    ]);
  });
});
