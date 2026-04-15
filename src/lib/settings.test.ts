import { beforeEach, describe, expect, test } from "vitest";
import { loadSettings } from "./settings";

beforeEach(async () => {
  await storage.clear("local");
});

describe("loadSettings", () => {
  test("defaults the grammar language if not set in browser storage", async () => {
    const result = await loadSettings();

    expect(result.getGrammarLanguage()).toEqual("sv");
  });

  test("loads the grammar language setting if set in browser storage", async () => {
    storage.setItem("local:grammlinGrammarLanguage", "en");

    const result = await loadSettings();

    expect(result.getGrammarLanguage()).toEqual("en");
  });

  test("falls back to default grammar language if settings is invalid in browser storage", async () => {
    storage.setItem("local:grammlinGrammarLanguage", "bad bad bad");

    const result = await loadSettings();

    expect(result.getGrammarLanguage()).toEqual("sv");
  });

  describe("toggleGrammarLanguage", () => {
    test("changes the preferred grammar language setting", async () => {
      const settings = await loadSettings();

      expect(settings.getGrammarLanguage()).toEqual("sv");

      await settings.toggleGrammarLanguage();

      expect(settings.getGrammarLanguage()).toEqual("en");
    });

    test("updates the browser session storage", async () => {
      const settings = await loadSettings();

      await settings.toggleGrammarLanguage();

      const storedSetting = await storage.getItem(
        "local:grammlinGrammarLanguage",
      );
      expect(storedSetting).toEqual("en");
    });
  });
});
