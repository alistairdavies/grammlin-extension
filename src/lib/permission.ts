import { extractOrigin } from "@/lib/url";

export type TabContext = {
  tabId: number;
  origin: string;
};

export function parseTabContext(tab: Browser.tabs.Tab): TabContext | null {
  if (!tab.id || !tab.url) return null;

  const origin = extractOrigin(tab.url);
  if (!origin) return null;

  return { tabId: tab.id, origin };
}

export function newPermissionsTracker() {
  const contexts = new Map<number, string>();

  const add = (context: TabContext) => {
    contexts.set(context.tabId, context.origin);
  };

  const removeTab = (tabId: number) => {
    contexts.delete(tabId);
  };

  const exists = (context: TabContext): boolean => {
    return contexts.get(context.tabId) === context.origin;
  };

  const hasTab = (tabId: number): boolean => {
    return contexts.has(tabId);
  };

  return { add, removeTab, exists, hasTab };
}
