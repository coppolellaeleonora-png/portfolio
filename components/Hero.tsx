'use client';

import { motion } from 'framer-motion';
import { withBasePath } from '@/lib/utils';
import { hero, aboutLong } from '@/lib/content';
import ExpandableCard from './ExpandableCard';

export default function Hero() {
  return (
    <section id="intro" className="scroll-mt-28 px-4 pb-24 pt-2 sm:px-8 sm:pt-4">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3.5 py-1.5 font-mono text-xs text-cyan-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
            </span>
            {hero.role}
          </span>

          <h1 className="mt-6 font-display font-medium text-6xl italic leading-[0.98] text-ink sm:text-7xl lg:text-8xl">
            Eleonora
            <br />
            <span className="bg-gradient-to-r from-cyan-soft via-cyan to-cyan-deep bg-clip-text text-transparent">
              Coppolella
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg">
            {hero.bio}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#scripting"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-soft to-cyan-deep px-6 py-3 text-sm font-semibold text-abyss-950 shadow-glow transition-transform hover:scale-[1.03]"
            >
              Scopri i progetti
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contatti"
              className="rounded-full border border-glass-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-cyan/50 hover:text-cyan-soft"
            >
              Contattami
            </a>
          </div>

          <ExpandableCard collapsedLabel="Il mio background scientifico" className="mt-6">
            <p>{aboutLong}</p>
          </ExpandableCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-cyan/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-glass-border bg-gradient-to-br from-glass to-white/[0.03] p-2 shadow-card backdrop-blur-sm">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img
                src={withBasePath(hero.photo)}
                alt={hero.photoAlt}
                className="aspect-video w-full object-cover"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss-950/60 via-transparent to-transparent" />
            </div>
            {/* Corner brackets in stile "HUD" di analisi dati, richiamo alla bioacustica */}
            <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-cyan/60" />
            <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-cyan/60" />
            <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-cyan/60" />
            <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-cyan/60" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-20 flex justify-center"
      >
        <a
          href="#scripting"
          aria-label="Scorri alla sezione successiva"
          className="flex flex-col items-center gap-2 text-ink-faint transition-colors hover:text-cyan-soft"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Scorri</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-8 w-px bg-gradient-to-b from-cyan to-transparent"
          />
        </a>
      </motion.div>
    </section>
  );
}
