(function () {
  if (window.__VET_CHATBOT_LOADED__) return;
  window.__VET_CHATBOT_LOADED__ = true;

  const config = window.VetChatbotConfig || {};

  const params = new URLSearchParams({
    embed: "1",
    userName: config.petOwnerName || "",
    petName: config.petName || "",
    phoneNumber: config.phoneNumber || "",
    source: config.source || ""
  });

  const iframe = document.createElement("iframe");
  iframe.src = `https://vet-sdk-rh95.onrender.com/?${params.toString()}`;

  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "360px";
  iframe.style.height = "520px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999";

  document.body.appendChild(iframe);
})();
