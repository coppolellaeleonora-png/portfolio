'use client';

import { motion } from 'framer-motion';
import { livePhotos, methodology } from '@/lib/content';
import PhotoGrid from './PhotoGrid';
import ExpandableCard from './ExpandableCard';

export default function LiveSection() {
  return (
    <section id="live" className="scroll-mt-28 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-soft">
            03 — Live e scuole
          </p>
          <h2 className="mt-3 font-display font-medium text-4xl italic text-ink sm:text-5xl">
            Divulgazione dal vivo e nelle scuole
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-dim sm:text-lg">
            Laboratori, lezioni e festival dal vivo, dove la biologia marina incontra bambini,
            ragazzi e pubblico generalista.
          </p>
        </motion.div>

        <div className="mt-12">
          <PhotoGrid photos={livePhotos} />
        </div>

        <div className="mt-16 rounded-3xl border border-glass-border bg-gradient-to-br from-glass to-white/[0.02] p-6 backdrop-blur-sm sm:p-8">
          <h3 className="font-display font-medium text-2xl italic text-ink sm:text-3xl">
            {methodology.intro}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim sm:text-base">
            {methodology.fixedText}
          </p>

          <ExpandableCard
            title="Il metodo, format per format"
            collapsedLabel={methodology.expandTitle}
            className="mt-6"
          >
            <div className="space-y-8">
              {methodology.formats.map((format) => (
                <div key={format.name}>
                  <h5 className="font-display font-medium text-lg italic text-ink">{format.name}</h5>
                  <p className="mt-1 font-mono text-xs text-cyan-soft">
                    Obiettivo: {format.objective}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{format.role}</p>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-dim marker:text-cyan/60">
                    {format.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </ExpandableCard>
        </div>
      </div>
    </section>
  );
}
