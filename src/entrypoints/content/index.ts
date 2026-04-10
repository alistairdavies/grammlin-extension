import "./style.css";
import type { ExtensionEvent, AnalyseResponse } from "@/lib/events";
import {
  showLoading,
  hidePopup,
  setTokens,
  setError,
  isVisible,
} from "./popup-state.svelte";
import Popup from "./Popup.svelte";
import { mount, unmount } from "svelte";

const MIN_SELECTION_LENGTH = 2;
const MAX_SELECTION_LENGTH = 75;
const VIEWPORT_MARGIN = 8;
const POPUP_WIDTH = 350;

export default defineContentScript({
  matches: [],
  registration: "runtime",
  cssInjectionMode: "ui",

  async main(ctx) {
    if (document.querySelector("grammlin-popup")) return;

    let enabled = true;

    const ui = await createShadowRootUi(ctx, {
      name: "grammlin-popup",
      position: "overlay",
      onMount: (container) => {
        return mount(Popup, { target: container });
      },
      onRemove: (app) => {
        if (app) unmount(app);
      },
    });
    ui.mount();

    browser.runtime.onMessage.addListener((message: ExtensionEvent) => {
      if (message.action === "disableExtension") {
        enabled = false;
        hidePopup();
      }
    });

    document.addEventListener("mouseup", async (e) => {
      if (!enabled) return;

      if (
        ui.shadowHost.contains(e.target as Node) ||
        ui.shadowHost === e.target
      ) {
        return;
      }

      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (
        !text ||
        text.length < MIN_SELECTION_LENGTH ||
        text.length > MAX_SELECTION_LENGTH
      ) {
        hidePopup();
        return;
      }

      const range = selection!.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const { top, left } = computePosition(rect);

      showLoading(left, top);

      const response: AnalyseResponse = await browser.runtime.sendMessage<
        ExtensionEvent,
        AnalyseResponse
      >({
        action: "analyseSentence",
        text,
      });

      if (response.status === "success") {
        setTokens(response.tokens);
      } else {
        setError(response.errorType);
      }
    });

    document.addEventListener(
      "scroll",
      () => {
        if (!enabled) return;
        if (isVisible()) hidePopup();
      },
      true,
    );
  },
});

function computePosition(rect: DOMRect): { top: number; left: number } {
  const gap = 6;
  let top = rect.bottom + gap;
  let left = rect.left + rect.width / 2 - POPUP_WIDTH / 2;

  if (top + 200 > window.innerHeight) {
    top = rect.top - gap;
  }

  left = Math.max(
    VIEWPORT_MARGIN,
    Math.min(left, window.innerWidth - POPUP_WIDTH - VIEWPORT_MARGIN),
  );

  return { top, left };
}
