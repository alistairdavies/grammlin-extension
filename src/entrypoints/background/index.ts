import { parseSentence } from "@/lib/api/service";
import { UnprocessableResponseError } from "@/lib/api/errors";
import type { ExtensionEvent, AnalyseResponse } from "@/lib/events";

export default defineBackground(() => {
  browser.action.onClicked.addListener(async (tab) => {
    if (!tab.id) return;

    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["/content-scripts/content.js"],
    });
  });

  browser.runtime.onMessage.addListener(
    (message: ExtensionEvent, _sender, sendResponse) => {
      if (message.action === "analyseSentence") {
        handleAnalyse(message.text).then(sendResponse);
        return true;
      }
    },
  );
});

async function handleAnalyse(text: string): Promise<AnalyseResponse> {
  try {
    const tokens = await parseSentence(text);
    return { status: "success", tokens };
  } catch (error) {
    return {
      status: "error",
      errorType:
        error instanceof UnprocessableResponseError ? "invalid" : "unexpected",
    };
  }
}
