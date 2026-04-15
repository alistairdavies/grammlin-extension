export type GrammarLanguage = "en" | "sv";
export type Settings = Awaited<ReturnType<typeof loadSettings>>;

const STORAGE_KEY = "local:grammlinGrammarLanguage";
const DEFAULT_LANGUAGE: GrammarLanguage = "sv";

export async function loadSettings() {
  let grammarLanguage = DEFAULT_LANGUAGE;

  const grammarLanguageInStorage = await storage.getItem(STORAGE_KEY);
  if (grammarLanguageInStorage === "en") {
    grammarLanguage = "en";
  }

  const getGrammarLanguage = (): GrammarLanguage => {
    return grammarLanguage;
  };

  const toggleGrammarLanguage = async () => {
    grammarLanguage = grammarLanguage === "en" ? "sv" : "en";
    await storage.setItem(STORAGE_KEY, grammarLanguage);
  };

  return { getGrammarLanguage, toggleGrammarLanguage };
}
