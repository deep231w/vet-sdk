(function() {
  const script = document.currentScript;
  const config = window.VetChatbotConfig || {};
  
  const root = document.createElement('div');
  root.id = 'vet-chatbot-root';
  document.body.appendChild(root);

  const scriptSrc = script.src;
  const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${baseUrl}/assets/index.css`;
  document.head.appendChild(link);

  const appScript = document.createElement('script');
  appScript.type = 'module';
  appScript.src = `${baseUrl}/assets/index.js`;
  document.head.appendChild(appScript);
})();
