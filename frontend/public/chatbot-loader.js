(function () {
  if (window.__VET_CHATBOT_LOADED__) return;
  window.__VET_CHATBOT_LOADED__ = true;

  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:5173/?embed=1";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "360px";
  iframe.style.height = "520px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999";

  document.body.appendChild(iframe);
})();
