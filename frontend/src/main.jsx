import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const params = new URLSearchParams(window.location.search);
const isEmbed = params.get("embed") === "1";

// mark embed mode on body
if (isEmbed) {
  document.body.classList.add("embed-mode");
}

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App isEmbed={isEmbed} />);
}
