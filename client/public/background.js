/* eslint-disable no-undef */

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  console.log(tabId);
});