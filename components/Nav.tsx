'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { nav, site } from '@/lib/content';

export default function Nav() {
  const [activeId, setActiveId] = useState(nav[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const lastId = nav[nav.length - 1].id;

    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // L'ultima sezione (il footer "Contatti") è corta: se è più bassa
      // della fascia osservata dall'IntersectionObserver qui sotto, a fine
      // pagina non la raggiunge mai e la nav resta bloccata sulla sezione
      // precedente. Appena si tocca il fondo della pagina, forziamo
      // l'ultima voce attiva.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) setActiveId(lastId);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-8 sm:pt-6">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4">
        <a
          href="#intro"
          className="font-mono text-sm font-medium tracking-tight text-ink/80 transition-colors hover:text-cyan"
          aria-label={`${site.name} — torna all'inizio`}
        >
          EC<span className="text-cyan">.</span>
        </a>

        <nav
          aria-label="Navigazione principale"
          className={`no-scrollbar flex items-center gap-1 overflow-x-auto rounded-full border px-1.5 py-1.5 backdrop-blur-xl transition-colors duration-300 ${
            scrolled
              ? 'border-glass-border bg-abyss-900/70 shadow-card'
              : 'border-transparent bg-abyss-900/30'
          }`}
        >
          {nav.map((item) => {
            const isActive = item.id === activeId;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className="relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors sm:px-4"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan/20 to-cyan-deep/10 shadow-glow ring-1 ring-cyan/40"
                  />
                )}
                <span className={`relative ${isActive ? 'text-cyan-soft' : 'text-ink-dim hover:text-ink'}`}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
