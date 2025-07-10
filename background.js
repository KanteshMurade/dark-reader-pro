chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    darkEnabled: false,
    brightness: 1,
    blueLight: false
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-dark-mode") {
    chrome.storage.sync.get("darkEnabled", (data) => {
      chrome.storage.sync.set({ darkEnabled: !data.darkEnabled }, () => {
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach(tab => {
            if (tab.id && tab.url?.startsWith("http")) {
              chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["content.js"]
              });
            }
          });
        });
      });
    });
  }
});

