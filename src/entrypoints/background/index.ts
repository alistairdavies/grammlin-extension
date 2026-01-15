import { parseSentence } from "@/lib/api/service";
import { UnprocessableResponseError } from "@/lib/api/errors";
import type { ExtensionEvent } from "@/lib/events";

export default defineBackground(() => {
  browser.action.onClicked.addListener((tab) => {
    if (tab.id) {
      browser.sidePanel.open({ tabId: tab.id });
    }
  });

  browser.runtime.onMessage.addListener(
    (message: ExtensionEvent, _sender, sendResponse) => {
      handleBackgroundEvent(message);
      sendResponse();
    },
  );
});

async function handleBackgroundEvent(message: ExtensionEvent) {
  if (message.action === "analyseSentence") {
    await parseSentence(message.text)
      .then((tokens) => {
        browser.runtime.sendMessage<ExtensionEvent>({
          action: "displayAnalysedSentence",
          text: message.text,
          tokens: tokens,
        });
      })
      .catch((error) => {
        browser.runtime.sendMessage<ExtensionEvent>({
          action: "displayAnalyseError",
          errorType:
            error instanceof UnprocessableResponseError
              ? "invalid"
              : "unexpected",
        });
      });
  }
}
