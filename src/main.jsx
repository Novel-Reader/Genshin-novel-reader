import { createRoot } from 'react-dom/client'
import Router from "./router";

import "./css/common.css";

export function renderApp(containerId) {
  createRoot(document.getElementById('root')).render(Router);
}

if (import.meta.env.DEV) {
  renderApp('root');
}
