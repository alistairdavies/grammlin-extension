import { describe, expect, test } from "vitest";
import { morphologyLabel } from "./morphology-labels";

describe("morphologyLabel", () => {
  test("returns the corresponding label for the given morphology and language", async () => {
    const result = morphologyLabel("indefinite", "sv");

    expect(result).toEqual("obestämd");
  });
});
