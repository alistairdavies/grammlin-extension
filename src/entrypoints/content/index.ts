import "./style.css";
import type { ExtensionEvent, AnalyseResponse } from "@/lib/events";
import { PopupStore } from "./popup-state.svelte";
import Popup from "./Popup.svelte";
import { mount, unmount } from "svelte";

declare global {
  interface Window {
    __grammlinCleanup?: () => void;
  }
}

const MIN_SELECTION_LENGTH = 2;
const MAX_SELECTION_LENGTH = 75;
const POPUP_WIDTH = 350;

export default defineContentScript({
  matches: [],
  registration: "runtime",
  cssInjectionMode: "ui",

  async main(ctx) {
    if (window.__grammlinCleanup) window.__grammlinCleanup();

    const popup = new PopupStore();
    const abort = new AbortController();

    const ui = await createShadowRootUi(ctx, {
      name: "grammlin-popup",
      position: "overlay",
      onMount: (container) => {
        return mount(Popup, { target: container, props: { popup } });
      },
      onRemove: (app) => {
        if (app) unmount(app);
      },
    });
    ui.mount();

    const teardown = () => {
      abort.abort();
      ui.remove();
      browser.runtime.onMessage.removeListener(onMessage);
      delete window.__grammlinCleanup;
    };
    window.__grammlinCleanup = teardown;

    const onMessage = (message: ExtensionEvent) => {
      if (message.action === "disableExtension") {
        teardown();
      }
    };
    browser.runtime.onMessage.addListener(onMessage);

    document.addEventListener(
      "mouseup",
      (e) => handleSelection(e, ui.shadowHost, popup),
      { signal: abort.signal },
    );

    document.addEventListener(
      "scroll",
      () => {
        if (popup.isVisible) popup.hide();
      },
      { capture: true, signal: abort.signal },
    );
  },
});

async function handleSelection(
  e: MouseEvent,
  extensionUI: HTMLElement,
  popup: PopupStore,
): Promise<void> {
  if (extensionUI.contains(e.target as Node)) {
    return;
  }

  const selection = getSelectedText();

  if (
    !selection ||
    selection.text.length < MIN_SELECTION_LENGTH ||
    selection.text.length > MAX_SELECTION_LENGTH
  ) {
    popup.hide();
    return;
  }

  const { left, top } = calculatePopupPosition(selection.rect);

  popup.showLoading(left, top);

  const response: AnalyseResponse = await browser.runtime.sendMessage<
    ExtensionEvent,
    AnalyseResponse
  >({
    action: "analyseSentence",
    text: selection.text,
  });

  if (response.status === "success") {
    popup.setTokens(response.tokens);
  } else {
    popup.setError(response.errorType);
  }
}

function getSelectedText(): { text: string; rect: DOMRect } | null {
  const selection = window.getSelection();

  if (!selection) return null;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  return { text: selection.toString(), rect: rect };
}

function calculatePopupPosition(rect: DOMRect): { top: number; left: number } {
  const gap = 6;

  let top = rect.bottom + gap;
  if (top + 200 > window.innerHeight) {
    top = rect.top - gap;
  }

  let left = rect.left + rect.width / 2 - POPUP_WIDTH / 2;

  return { top, left };
}
