import { describe, expect, test } from "vitest";
import { posLabel } from "./pos-labels";

describe("posLabel", () => {
  test("returns the corresponding label for the given POS and language", async () => {
    const result = posLabel("noun", "sv");

    expect(result).toEqual("Substantiv");
  });
});
