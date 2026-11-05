import { renderToString } from 'react-dom/server';
import { App } from './App';
import { site } from './config/site';

/** Used only at build time by scripts/prerender.mjs. */
export function render(): string {
  return renderToString(<App />);
}

export { site };
