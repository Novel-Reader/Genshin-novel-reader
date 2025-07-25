import { createRoot } from 'react-dom/client'
import AppContainer from "./app-container";

export function renderApp(containerId) {
  createRoot(document.getElementById(containerId)).render(
    <AppContainer mode={'online'} server={'http://127.0.0.1:8081'} />
  );
}

if (import.meta.env.DEV) {
  renderApp('root');
}
