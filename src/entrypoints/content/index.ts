import type { ExtensionEvent } from "@/lib/events";

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    document.addEventListener("mouseup", async () => {
      const text = window.getSelection()?.toString().trim();

      if (text) {
        await browser.runtime.sendMessage<ExtensionEvent>({
          action: "analyseSentence",
          text: text,
        });
      }
    });
  },
});
