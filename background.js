"use strict";

let timeoutID = 0;
let dragging = false;

browser.tabs.onMoved.addListener(() => {
  dragging = true;
});

browser.tabs.onDetached.addListener(() => {
  dragging = true;
});

browser.tabs.onActivated.addListener(({ tabId }) => {
  dragging = false;
  clearTimeout(timeoutID);
  timeoutID = setTimeout(async () => {
    if (dragging) return;

    try {
      const tab = await browser.tabs.get(tabId);
      if (tab.pinned) return;

      const pinnedTabs = await browser.tabs.query({
        pinned: true,
        windowId: tab.windowId,
      });

      const targetIndex = pinnedTabs.length;
      if (tab.index > targetIndex) {
        await browser.tabs.move(tabId, { index: targetIndex });
      }
    } catch (error) {
      console.log("Tab move failed:", error);
    }
  }, 100);
});
