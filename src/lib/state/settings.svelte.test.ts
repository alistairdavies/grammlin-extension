import { beforeEach, describe, expect, test } from "vitest";
import { loadSettings } from "./settings.svelte";

beforeEach(async () => {
  await storage.clear("local");
});

describe("loadSettings", () => {
  test("defaults the settings if not set in browser storage", async () => {
    const result = await loadSettings();

    expect(result.grammarLanguage).toEqual("sv");
    expect(result.welcomeMessageSeen).toEqual(false);
  });

  test("loads the grammar language setting if set in browser storage", async () => {
    storage.setItem("local:grammlinGrammarLanguage", "en");

    const result = await loadSettings();

    expect(result.grammarLanguage).toEqual("en");
  });

  test("falls back to default grammar language if settings is invalid in browser storage", async () => {
    storage.setItem("local:grammlinGrammarLanguage", "bad bad bad");

    const result = await loadSettings();

    expect(result.grammarLanguage).toEqual("sv");
  });

  test("loads the welcome message setting if any value is set in browser storage", async () => {
    storage.setItem("local:grammlinWelcomeMessageSeen", true);

    const result = await loadSettings();

    expect(result.welcomeMessageSeen).toEqual(true);
  });

  describe("toggleGrammarLanguage", () => {
    test("changes the preferred grammar language setting", async () => {
      const settings = await loadSettings();

      expect(settings.grammarLanguage).toEqual("sv");

      await settings.toggleGrammarLanguage();

      expect(settings.grammarLanguage).toEqual("en");
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

  describe("setWelcomeMessageSeen", () => {
    test("changes welcome message setting to true", async () => {
      const settings = await loadSettings();

      expect(settings.welcomeMessageSeen).toEqual(false);

      await settings.setWelcomeMessageSeen();

      expect(settings.welcomeMessageSeen).toEqual(true);
    });

    test("updates the browser session storage", async () => {
      const settings = await loadSettings();

      await settings.setWelcomeMessageSeen();

      const storedSetting = await storage.getItem(
        "local:grammlinWelcomeMessageSeen",
      );
      expect(storedSetting).toEqual(true);
    });
  });
});
