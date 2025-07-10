document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("toggleDark");
  const blueLight = document.getElementById("blueLight");
  const brightness = document.getElementById("brightness");

  chrome.storage.sync.get(["darkEnabled", "blueLight", "brightness"], (data) => {
    darkToggle.checked = data.darkEnabled ?? false;
    blueLight.checked = data.blueLight ?? false;
    brightness.value = data.brightness ?? 1;
  });

  const save = () => {
    chrome.storage.sync.set({
      darkEnabled: darkToggle.checked,
      blueLight: blueLight.checked,
      brightness: parseFloat(brightness.value)
    }, () => {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          if (tab.url?.startsWith("http")) {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ["content.js"]
            });
          }
        });
      });
    });
  };

  darkToggle.addEventListener("change", save);
  blueLight.addEventListener("change", save);
  brightness.addEventListener("input", save);
});

