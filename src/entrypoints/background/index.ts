import { parseSentence } from "@/lib/api/service";
import { UnprocessableResponseError } from "@/lib/api/errors";
import type { ExtensionEvent } from "@/lib/events";

let sidePanelPort: ReturnType<typeof browser.runtime.connect> | null = null;

export default defineBackground(() => {
  browser.sidePanel.setOptions({ enabled: false });

  browser.action.onClicked.addListener(async (tab) => {
    if (!tab.id) return;

    browser.sidePanel.setOptions({
      tabId: tab.id,
      path: "sidepanel.html",
      enabled: true,
    });
    await browser.sidePanel.open({ tabId: tab.id });
    browser.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["/content-scripts/content.js"],
    });
  });

  browser.runtime.onConnect.addListener((port) => {
    if (port.name === "sidepanel") {
      sidePanelPort = port;
      port.onDisconnect.addListener(() => {
        sidePanelPort = null;
      });
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
    if (!sidePanelPort) return;

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
