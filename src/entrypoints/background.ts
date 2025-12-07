import { parseSentence } from "@/lib/api/service";

export default defineBackground(() => {
  browser.action.onClicked.addListener((tab) => {
    if (tab.id) {
      browser.sidePanel.open({ tabId: tab.id });
    }
  });

  browser.runtime.onMessage.addListener(async (message) => {
    if (message.action === "analyseSentence") {
      await parseSentence(message.text).then((parsed) => {
        browser.runtime.sendMessage({
          action: "displayParsedSentence",
          text: message.text,
          parsed: parsed,
        });
      });

      return true;
    }
  });
});
