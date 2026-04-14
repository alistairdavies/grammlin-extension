export type GrammarLanguage = "en" | "sv";

const STORAGE_KEY = "grammlinGrammarLanguage";
const DEFAULT_LANGUAGE: GrammarLanguage = "sv";

export async function loadSettings() {
  const result = await browser.storage.local.get(STORAGE_KEY);
  let grammarLanguage =
    (result[STORAGE_KEY] as GrammarLanguage) ?? DEFAULT_LANGUAGE;

  const getGrammarLanguage = (): GrammarLanguage => {
    return grammarLanguage;
  };

  const toggleGrammarLanguage = async () => {
    grammarLanguage = grammarLanguage === "en" ? "sv" : "en";
    await browser.storage.local.set({ [STORAGE_KEY]: grammarLanguage });
  };

  return { getGrammarLanguage, toggleGrammarLanguage };
}

export type Settings = Awaited<ReturnType<typeof loadSettings>>;
