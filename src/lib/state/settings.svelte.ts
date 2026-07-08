export type GrammarLanguage = 'en' | 'sv'
export type Settings = Awaited<ReturnType<typeof loadSettings>>

const storageKeys: {
  grammarLanguage: StorageItemKey
  welcomeMessageSeenAt: StorageItemKey
  feedbackMessageSeenAt: StorageItemKey
} = {
  grammarLanguage: 'local:grammlinGrammarLanguage',
  welcomeMessageSeenAt: 'local:grammlinWelcomeMessageSeen',
  feedbackMessageSeenAt: 'local:grammlinFeedbackMessageSeen',
}

const DEFAULT_LANGUAGE: GrammarLanguage = 'sv'
const FEEDBACK_PROMPT_DELAY_MS = 7 * 24 * 60 * 60 * 1000

export async function loadSettings() {
  let grammarLanguage = $state(await loadGrammarLanguage())
  let welcomeMessageSeenAt = $state(await loadWelcomeMessageSeenAt())
  let feedbackMessageSeenAt = $state(await loadFeedbackMessageSeenAt())

  const toggleGrammarLanguage = async () => {
    grammarLanguage = grammarLanguage === 'en' ? 'sv' : 'en'
    await storage.setItem(storageKeys.grammarLanguage, grammarLanguage)
  }

  const setWelcomeMessageSeen = async () => {
    welcomeMessageSeenAt = Date.now()
    await storage.setItem(
      storageKeys.welcomeMessageSeenAt,
      welcomeMessageSeenAt,
    )
  }

  const setFeedbackMessageSeen = async () => {
    feedbackMessageSeenAt = Date.now()
    await storage.setItem(
      storageKeys.feedbackMessageSeenAt,
      feedbackMessageSeenAt,
    )
  }

  return {
    get grammarLanguage() {
      return grammarLanguage
    },
    get showWelcomeMessage() {
      return welcomeMessageSeenAt === null
    },
    get showFeedbackMessage() {
      return (
        welcomeMessageSeenAt !== null &&
        feedbackMessageSeenAt === null &&
        Date.now() - welcomeMessageSeenAt >= FEEDBACK_PROMPT_DELAY_MS
      )
    },
    toggleGrammarLanguage,
    setWelcomeMessageSeen,
    setFeedbackMessageSeen,
  }
}

async function loadGrammarLanguage() {
  const grammarLanguageInStorage = await storage.getItem(
    storageKeys.grammarLanguage,
  )

  if (grammarLanguageInStorage === 'en') {
    return 'en'
  }

  return DEFAULT_LANGUAGE
}

async function loadWelcomeMessageSeenAt(): Promise<number | null> {
  const stored = await storage.getItem(storageKeys.welcomeMessageSeenAt)

  if (typeof stored === 'number') {
    return stored
  }

  if (stored === true) {
    // Migrate the legacy boolean flag to a timestamp so elapsed time can be measured
    const now = Date.now()
    await storage.setItem(storageKeys.welcomeMessageSeenAt, now)
    return now
  }

  return null
}

async function loadFeedbackMessageSeenAt(): Promise<number | null> {
  const stored = await storage.getItem(storageKeys.feedbackMessageSeenAt)

  return typeof stored === 'number' ? stored : null
}
