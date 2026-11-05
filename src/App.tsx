import { useEffect } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Benefits } from './components/sections/Benefits';
import { StudioCraft } from './components/sections/StudioCraft';
import { Closing, Faq } from './components/sections/Faq';
import { Hero, PreviewSection } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { Collaboration, LocalFirst } from './components/sections/LocalFirst';

/**
 * Optional section entrances. Content is fully visible in the prerendered HTML;
 * hiding only starts after hydration, and never with reduced motion.
 */
function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const viewport = window.innerHeight;
    for (const el of items) {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewport) el.classList.add('is-in');
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    items.filter((el) => !el.classList.contains('is-in')).forEach((el) => observer.observe(el));
    document.documentElement.classList.add('reveal-ready');
    return () => observer.disconnect();
  }, []);
}

export function App() {
  useReveal();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <PreviewSection />
        <Benefits />
        <StudioCraft />
        <HowItWorks />
        <LocalFirst />
        <Collaboration />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
