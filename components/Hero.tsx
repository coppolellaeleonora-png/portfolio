'use client';

import { motion } from 'framer-motion';
import { withBasePath } from '@/lib/utils';
import { hero } from '@/lib/content';

export default function Hero() {
  return (
    <section id="intro" className="scroll-mt-24 px-4 pb-16 pt-6 sm:px-8">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-abyss">{hero.role}</p>
          <h1 className="mt-4 font-display text-5xl italic leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            {hero.name}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/90 sm:text-lg">
            {hero.bio}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#scripting"
              className="rounded-full bg-abyss px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-abyss-light"
            >
              Storytelling & Video ↓
            </a>
            <a
              href="#contatti"
              className="rounded-full border border-ink/30 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Contattami
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-hidden rounded-3xl"
        >
          <img
            src={withBasePath(hero.photo)}
            alt={hero.photoAlt}
            className="h-[360px] w-full object-cover sm:h-[440px] lg:h-[520px]"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
}
