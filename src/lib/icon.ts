export async function setIconActive(tabId: number): Promise<void> {
  await browser.action.setIcon({
    tabId,
    path: {
      "16": "/icon/16.png",
      "32": "/icon/32.png",
      "48": "/icon/48.png",
    },
  });
}

export async function setIconInactive(tabId: number): Promise<void> {
  await browser.action.setIcon({
    tabId,
    path: {
      "16": "/icon-inactive/16.png",
      "32": "/icon-inactive/32.png",
      "48": "/icon-inactive/48.png",
    },
  });
}
