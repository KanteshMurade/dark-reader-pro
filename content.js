chrome.storage.sync.get(["darkEnabled", "blueLight", "brightness"], (data) => {
  const existing = document.getElementById("dark-style");
  if (existing) existing.remove();

  const style = document.createElement("style");
  style.id = "dark-style";

  const blueShift = data.blueLight ? ' sepia(0.3) hue-rotate(20deg) saturate(0.7)' : '';
  const brightness = `brightness(${data.brightness || 1})`;
  const filter = brightness + blueShift;

  style.textContent = `
    html, body {
      ${data.darkEnabled ? `background: #121212 !important; color: #e0e0e0 !important;` : ''}
      filter: ${filter} !important;
    }
    img, video, picture {
      filter: none !important;
    }
    * {
      ${data.darkEnabled ? `background-color: transparent !important; color: inherit !important;` : ''}
    }
  `;
  document.head.appendChild(style);
});

