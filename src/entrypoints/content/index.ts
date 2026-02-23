import type { ExtensionEvent } from "@/lib/events";

const MIN_SELECTION_LENGTH = 2;
const MAX_SELECTION_LENGTH = 500;

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    document.addEventListener("mouseup", async () => {
      const text = window.getSelection()?.toString().trim();

      if (
        text &&
        text.length >= MIN_SELECTION_LENGTH &&
        text.length <= MAX_SELECTION_LENGTH
      ) {
        await browser.runtime.sendMessage<ExtensionEvent>({
          action: "analyseSentence",
          text: text,
        });
      }
    });
  },
});
