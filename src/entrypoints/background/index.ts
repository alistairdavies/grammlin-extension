import { parseSentence } from "@/lib/api/service";
import { UnprocessableResponseError } from "@/lib/api/errors";
import type { ExtensionEvent, AnalyseResponse } from "@/lib/events";
import { setIconActive, setIconInactive } from "@/lib/icon";
import {
  newPermissionsTracker,
  parseTabContext,
  type TabContext,
} from "@/lib/permission";

const tracker = newPermissionsTracker();

export default defineBackground(() => {
  browser.action.onClicked.addListener(async (tab) => {
    const context = parseTabContext(tab);
    if (!context) return;

    if (!tracker.hasTab(context.tabId)) {
      enableExtension(context);
    } else {
      disableExtension(context.tabId);
    }
  });

  browser.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
    if (changeInfo.status !== "complete") return;

    const context = parseTabContext(tab);
    if (!context || !tracker.hasTab(context.tabId)) return;

    if (tracker.exists(context)) {
      enableExtension(context);
    } else {
      disableExtension(context.tabId);
    }
  });

  browser.tabs.onActivated.addListener(async ({ tabId }) => {
    if (tracker.hasTab(tabId)) {
      await setIconActive(tabId);
    } else {
      await setIconInactive(tabId);
    }
  });

  browser.tabs.onRemoved.addListener((tabId) => {
    tracker.removeTab(tabId);
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

function injectContentScript(tabId: number) {
  return browser.scripting.executeScript({
    target: { tabId },
    files: ["/content-scripts/content.js"],
  });
}

async function enableExtension(context: TabContext) {
  try {
    await injectContentScript(context.tabId);
  } catch (error) {
    console.debug("Unable to inject extension content script.", error);
    disableExtension(context.tabId);
    return;
  }

  await setIconActive(context.tabId);
  tracker.add(context);
}

async function disableExtension(tabId: number) {
  tracker.removeTab(tabId);
  await setIconInactive(tabId);
  browser.tabs
    .sendMessage(tabId, { action: "disableExtension" })
    .catch((error) => {
      console.debug("Unable to send disable extension event.", error);
    });
}

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
