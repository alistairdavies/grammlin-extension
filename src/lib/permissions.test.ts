import { describe, expect, test } from "vitest";
import { parseTabContext } from "./permissions";
import { extractOrigin } from "./url";

describe("parseTabContext", () => {
  test("returns null if the given tab does not have an id", async () => {
    const tab = { id: undefined } as Browser.tabs.Tab;

    const result = parseTabContext(tab);

    expect(result).toBeNull();
  });

  test("returns null if the given tab does not have a url", async () => {
    const tab = { id: 1234, url: undefined } as Browser.tabs.Tab;

    const result = parseTabContext(tab);

    expect(result).toBeNull();
  });

  test("returns null if unable to extract the origin from the given tabs url", async () => {
    const tab = { id: 1234, url: "invalid-url" } as Browser.tabs.Tab;

    const result = parseTabContext(tab);

    expect(result).toBeNull();
  });

  test("returns the given tabs context", async () => {
    const tab = { id: 1234, url: "https://somewhere.com" } as Browser.tabs.Tab;

    const result = parseTabContext(tab);

    expect(result).toEqual({ tabId: 1234, origin: extractOrigin(tab.url!) });
  });
});
