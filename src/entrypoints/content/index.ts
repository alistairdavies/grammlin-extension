export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    document.addEventListener("mouseup", async () => {
      const text = window.getSelection()?.toString().trim();

      if (text) {
        await browser.runtime.sendMessage({
          action: "analyseSentence",
          text: text,
        });
      }
    });
  },
});
