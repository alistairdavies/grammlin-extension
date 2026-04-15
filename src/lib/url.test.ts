import { describe, expect, test } from "vitest";
import { extractOrigin } from "./url";

describe("extractOrigin", () => {
  test("returns null for an invalid url", () => {
    const result = extractOrigin("not-a-url");

    expect(result).toBeNull();
  });

  test("returns null for a url that does not have https as the protocol", () => {
    const result = extractOrigin("chrome://something.com");

    expect(result).toBeNull();
  });

  test("returns the origin of a valid https url", () => {
    const result = extractOrigin("https://something.com/nice-page");

    expect(result).toEqual("https://something.com");
  });
});
