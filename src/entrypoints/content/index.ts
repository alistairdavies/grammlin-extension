import './style.css'
import { mount, unmount } from 'svelte'
import type { AnalyseResponse, ExtensionEvent } from '@/lib/events'
import { loadSettings } from '@/lib/state/settings.svelte'
import App from './App.svelte'
import { type PopupPosition, PopupStore } from './popup-state.svelte'

declare global {
  interface Window {
    __grammlinCleanup?: () => void
  }
}

const MIN_SELECTION_LENGTH = 2
const MAX_SELECTION_LENGTH = 75
const POPUP_WIDTH = 350

export default defineContentScript({
  matches: [],
  registration: 'runtime',
  cssInjectionMode: 'ui',

  async main(ctx) {
    if (window.__grammlinCleanup) window.__grammlinCleanup()

    const popup = new PopupStore()
    const settings = await loadSettings()
    const abort = new AbortController()

    const openOptions = async () => {
      await browser.runtime.sendMessage<ExtensionEvent>({
        action: 'openOptions',
      })
    }

    const ui = await createShadowRootUi(ctx, {
      name: 'grammlin-popup',
      position: 'overlay',
      onMount: (container) => {
        return mount(App, {
          target: container,
          props: { popup, settings, openOptions },
        })
      },
      onRemove: (app) => {
        if (app) unmount(app)
      },
    })
    ui.mount()

    const teardown = () => {
      abort.abort()
      ui.remove()
      browser.runtime.onMessage.removeListener(onMessage)
      delete window.__grammlinCleanup
    }
    window.__grammlinCleanup = teardown

    const onMessage = (message: ExtensionEvent) => {
      if (message.action === 'disableExtension') {
        teardown()
      }
    }
    browser.runtime.onMessage.addListener(onMessage)

    document.addEventListener(
      'mouseup',
      (e) => setTimeout(() => handleSelection(e, ui.shadowHost, popup), 10),
      { signal: abort.signal },
    )

    document.addEventListener(
      'scroll',
      () => {
        if (popup.isVisible) popup.hide()
      },
      { capture: true, signal: abort.signal },
    )
  },
})

async function handleSelection(
  e: MouseEvent,
  extensionUI: HTMLElement,
  popup: PopupStore,
): Promise<void> {
  if (extensionUI.contains(e.target as Node)) {
    e.stopPropagation()
    return
  }

  const selection = getSelectedText()

  if (
    !selection ||
    selection.text.length < MIN_SELECTION_LENGTH ||
    selection.text.length > MAX_SELECTION_LENGTH
  ) {
    popup.hide()
    return
  }

  popup.showLoading(calculatePopupPosition(selection.rect))

  const response: AnalyseResponse = await browser.runtime.sendMessage<
    ExtensionEvent,
    AnalyseResponse
  >({
    action: 'analyseSentence',
    text: selection.text,
  })

  if (response.status === 'success') {
    popup.setTokens(response.tokens)
  } else {
    popup.setError(response.errorType)
  }
}

function getSelectedText(): { text: string; rect: DOMRect } | null {
  const selection = window.getSelection()

  if (!selection || selection.isCollapsed) return null

  const range = selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()

  return { text: selection.toString(), rect: rect }
}

function calculatePopupPosition(rect: DOMRect): PopupPosition {
  const gap = 6

  let left = rect.left + rect.width / 2 - POPUP_WIDTH / 2
  if (left < gap) left = gap
  if (left + POPUP_WIDTH > window.innerWidth - gap) {
    left = window.innerWidth - POPUP_WIDTH - gap
  }

  const spaceBelow = window.innerHeight - rect.bottom - gap
  const spaceAbove = rect.top - gap

  if (spaceBelow >= spaceAbove) {
    return { direction: 'below', top: rect.bottom + gap, left }
  } else {
    return {
      direction: 'above',
      bottom: window.innerHeight - rect.top + gap,
      left,
    }
  }
}
