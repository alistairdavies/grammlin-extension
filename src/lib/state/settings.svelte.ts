export type GrammarLanguage = "en" | "sv";
export type Settings = Awaited<ReturnType<typeof loadSettings>>;

const storageKeys: {
  grammarLanguage: StorageItemKey;
  welcomeMessageSeen: StorageItemKey;
} = {
  grammarLanguage: "local:grammlinGrammarLanguage",
  welcomeMessageSeen: "local:grammlinWelcomeMessageSeen",
};

const DEFAULT_LANGUAGE: GrammarLanguage = "sv";

export async function loadSettings() {
  let grammarLanguage = $state(await loadGrammarLanguage());
  let welcomeMessageSeen = $state(await loadWelcomeMessageSeen());

  const toggleGrammarLanguage = async () => {
    grammarLanguage = grammarLanguage === "en" ? "sv" : "en";
    await storage.setItem(storageKeys.grammarLanguage, grammarLanguage);
  };

  const setWelcomeMessageSeen = async () => {
    welcomeMessageSeen = true;
    await storage.setItem(storageKeys.welcomeMessageSeen, welcomeMessageSeen);
  };

  return {
    get grammarLanguage() {
      return grammarLanguage;
    },
    get welcomeMessageSeen() {
      return welcomeMessageSeen;
    },
    toggleGrammarLanguage,
    setWelcomeMessageSeen,
  };
}

async function loadGrammarLanguage() {
  const grammarLanguageInStorage = await storage.getItem(
    storageKeys.grammarLanguage,
  );

  if (grammarLanguageInStorage === "en") {
    return "en";
  }

  return DEFAULT_LANGUAGE;
}

async function loadWelcomeMessageSeen() {
  return (await storage.getItem(storageKeys.welcomeMessageSeen)) !== null;
}
