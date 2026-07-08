import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { loadSettings } from './settings.svelte'

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000
const NOW = new Date('2026-01-01T00:00:00.000Z').getTime()

beforeEach(async () => {
  await storage.clear('local')
  vi.useFakeTimers()
  vi.setSystemTime(NOW)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('loadSettings', () => {
  test('defaults the settings if not set in browser storage', async () => {
    const result = await loadSettings()

    expect(result.grammarLanguage).toEqual('sv')
    expect(result.showWelcomeMessage).toEqual(true)
    expect(result.showFeedbackMessage).toEqual(false)
  })

  test('loads the grammar language setting if set in browser storage', async () => {
    storage.setItem('local:grammlinGrammarLanguage', 'en')

    const result = await loadSettings()

    expect(result.grammarLanguage).toEqual('en')
  })

  test('falls back to default grammar language if settings is invalid in browser storage', async () => {
    storage.setItem('local:grammlinGrammarLanguage', 'bad bad bad')

    const result = await loadSettings()

    expect(result.grammarLanguage).toEqual('sv')
  })

  test('does not show the welcome message once a seen timestamp is in browser storage', async () => {
    storage.setItem('local:grammlinWelcomeMessageSeen', NOW)

    const result = await loadSettings()

    expect(result.showWelcomeMessage).toEqual(false)
  })

  test('migrates a legacy boolean welcome message flag to the current time', async () => {
    storage.setItem('local:grammlinWelcomeMessageSeen', true)

    const result = await loadSettings()

    expect(result.showWelcomeMessage).toEqual(false)
    const migrated = await storage.getItem('local:grammlinWelcomeMessageSeen')
    expect(migrated).toEqual(NOW)
  })

  describe('toggleGrammarLanguage', () => {
    test('changes the preferred grammar language setting', async () => {
      const settings = await loadSettings()

      expect(settings.grammarLanguage).toEqual('sv')

      await settings.toggleGrammarLanguage()

      expect(settings.grammarLanguage).toEqual('en')
    })

    test('updates the browser session storage', async () => {
      const settings = await loadSettings()

      await settings.toggleGrammarLanguage()

      const storedSetting = await storage.getItem(
        'local:grammlinGrammarLanguage',
      )
      expect(storedSetting).toEqual('en')
    })
  })

  describe('setWelcomeMessageSeen', () => {
    test('stops the welcome message from showing', async () => {
      const settings = await loadSettings()

      expect(settings.showWelcomeMessage).toEqual(true)

      await settings.setWelcomeMessageSeen()

      expect(settings.showWelcomeMessage).toEqual(false)
    })

    test('stores the current time in browser storage', async () => {
      const settings = await loadSettings()

      await settings.setWelcomeMessageSeen()

      const storedSetting = await storage.getItem(
        'local:grammlinWelcomeMessageSeen',
      )
      expect(storedSetting).toEqual(NOW)
    })
  })

  describe('showFeedbackMessage', () => {
    test('is false when the welcome message has not been seen yet', async () => {
      const result = await loadSettings()

      expect(result.showFeedbackMessage).toEqual(false)
    })

    test('is false when the welcome message was seen less than 7 days ago', async () => {
      storage.setItem('local:grammlinWelcomeMessageSeen', NOW)
      vi.setSystemTime(NOW + SEVEN_DAYS_MS - 1000)

      const result = await loadSettings()

      expect(result.showFeedbackMessage).toEqual(false)
    })

    test('is true once the welcome message was seen more than 7 days ago', async () => {
      storage.setItem('local:grammlinWelcomeMessageSeen', NOW)
      vi.setSystemTime(NOW + SEVEN_DAYS_MS + 1000)

      const result = await loadSettings()

      expect(result.showFeedbackMessage).toEqual(true)
    })

    test('is false once feedback has already been seen', async () => {
      storage.setItem('local:grammlinWelcomeMessageSeen', NOW)
      storage.setItem('local:grammlinFeedbackMessageSeen', NOW)
      vi.setSystemTime(NOW + SEVEN_DAYS_MS + 1000)

      const result = await loadSettings()

      expect(result.showFeedbackMessage).toEqual(false)
    })
  })

  describe('setFeedbackMessageSeen', () => {
    test('stops the feedback message from showing', async () => {
      storage.setItem('local:grammlinWelcomeMessageSeen', NOW)
      vi.setSystemTime(NOW + SEVEN_DAYS_MS + 1000)
      const settings = await loadSettings()

      expect(settings.showFeedbackMessage).toEqual(true)

      await settings.setFeedbackMessageSeen()

      expect(settings.showFeedbackMessage).toEqual(false)
    })

    test('stores the current time in browser storage', async () => {
      const settings = await loadSettings()
      const seenAt = NOW + SEVEN_DAYS_MS + 1000
      vi.setSystemTime(seenAt)

      await settings.setFeedbackMessageSeen()

      const storedSetting = await storage.getItem(
        'local:grammlinFeedbackMessageSeen',
      )
      expect(storedSetting).toEqual(seenAt)
    })
  })
})
