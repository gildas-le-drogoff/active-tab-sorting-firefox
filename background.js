"use strict";

const MOVE_DELAY = 400;

let timeoutID = 0;

browser.tabs.onActivated.addListener(({ tabId }) => {
  clearTimeout(timeoutID);
  timeoutID = setTimeout(async () => {
    try {
      const tab = await browser.tabs.get(tabId);
      if (tab.pinned) return;
      if (!tab.active) return;

      const initialIndex = tab.index;
      await new Promise((r) => setTimeout(r, 150));

      const fresh = await browser.tabs.get(tabId);
      if (fresh.index !== initialIndex) return;

      const pinnedTabs = await browser.tabs.query({
        pinned: true,
        windowId: fresh.windowId,
      });

      const targetIndex = pinnedTabs.length;
      if (fresh.index > targetIndex) {
        await browser.tabs.move(tabId, { index: targetIndex });
      }
    } catch (error) {
      console.log("Tab move failed:", error);
    }
  }, MOVE_DELAY);
});
