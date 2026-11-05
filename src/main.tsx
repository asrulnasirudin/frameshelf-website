import { hydrateRoot, createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/index.css';

const container = document.getElementById('root');
if (container) {
  // The production build prerenders markup into #root; the dev server does not.
  if (container.hasChildNodes()) hydrateRoot(container, <App />);
  else createRoot(container).render(<App />);
}
