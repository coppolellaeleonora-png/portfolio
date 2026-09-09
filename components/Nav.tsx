'use client';

import { useEffect, useState } from 'react';
import { nav } from '@/lib/content';

export default function Nav() {
  const [activeId, setActiveId] = useState(nav[0].id);

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
    <header className="sticky top-0 z-50 w-full">
      <nav
        aria-label="Navigazione principale"
        className="mx-auto flex max-w-content items-center gap-1 overflow-x-auto px-4 py-3 sm:gap-2 sm:px-8"
      >
        <div className="flex items-center gap-1 rounded-full bg-periwinkle/70 p-1 backdrop-blur-md sm:gap-2">
          {nav.map((item) => {
            const isActive = item.id === activeId;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
                  isActive
                    ? 'bg-cream text-ink shadow-sm'
                    : 'text-ink/70 hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
