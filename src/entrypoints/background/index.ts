import { createService } from "@/lib/api/service";

import { UnprocessableResponseError } from "@/lib/api/errors";
import type { ExtensionEvent, AnalyseResponse } from "@/lib/events";
import { setIconActive, setIconInactive } from "@/lib/icon";
import { createLogger } from "@/lib/logging";
import {
  newPermissionsTracker,
  parseTabContext,
  type TabContext,
} from "@/lib/permissions";

const logger = createLogger("background");
const tracker = newPermissionsTracker();
const apiService = createService(import.meta.env.VITE_GRAMMAR_API_BASE_URL);

export default defineBackground(() => {
  // This action event fires when the user interacts with the extension icon
  // or they trigger the extension through a keyboard shortcut for `_execute_action`
  browser.action.onClicked.addListener(async (tab) => {
    const context = parseTabContext(tab);
    if (!context) return;

    if (tracker.hasTab(context.tabId)) {
      logger.debug("user_toggle_off", { tabId: context.tabId });
      await disableExtension(context.tabId);
    } else {
      logger.debug("user_toggle_on", {
        tabId: context.tabId,
        origin: context.origin,
      });
      await enableExtension(context);
    }
  });

  // Sync the extension state when the tab context changes
  // For example after a navigation
  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete") return;
    if (!tracker.hasTab(tabId)) return;

    const context = parseTabContext(tab);
    if (!context) return;

    if (tracker.exists(context)) {
      logger.debug("same_origin_navigation", { tabId, origin: context.origin });
      await enableExtension(context);
    } else {
      logger.debug("cross_origin_navigation", {
        tabId,
        origin: context.origin,
      });
      await disableExtension(tabId);
    }
  });

  // Sync the extension icon when the user switches between active tabs
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

      if (message.action === "openOptions") {
        browser.runtime.openOptionsPage();
        return true;
      }
    },
  );
});

async function enableExtension(context: TabContext) {
  try {
    await browser.scripting.executeScript({
      target: { tabId: context.tabId },
      files: ["/content-scripts/content.js"],
    });
  } catch {
    await disableExtension(context.tabId);
    return;
  }

  tracker.add(context);
  await setIconActive(context.tabId);
  logger.debug("extension_enabled", {
    tabId: context.tabId,
    origin: context.origin,
  });
}

async function disableExtension(tabId: number) {
  tracker.removeTab(tabId);
  await browser.tabs
    .sendMessage(tabId, { action: "disableExtension" })
    .catch(() => {});
  await setIconInactive(tabId);
  logger.debug("extension_disabled", { tabId });
}

async function handleAnalyse(text: string): Promise<AnalyseResponse> {
  try {
    const tokens = await apiService.parseSentence(text);
    return { status: "success", tokens: tokens };
  } catch (error) {
    return {
      status: "error",
      errorType:
        error instanceof UnprocessableResponseError ? "invalid" : "unexpected",
    };
  }
}
