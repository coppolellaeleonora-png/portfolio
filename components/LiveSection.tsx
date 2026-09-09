'use client';

import { motion } from 'framer-motion';
import { livePhotos, methodology } from '@/lib/content';
import PhotoGrid from './PhotoGrid';
import ExpandableCard from './ExpandableCard';

export default function LiveSection() {
  return (
    <section id="live" className="scroll-mt-24 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl italic text-ink sm:text-5xl">
            Divulgazione dal vivo e nelle scuole
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/90 sm:text-lg">
            Laboratori, lezioni e festival dal vivo, dove la bioacustica marina incontra
            bambini, ragazzi e pubblico generalista.
          </p>
        </motion.div>

        <div className="mt-10">
          <PhotoGrid photos={livePhotos} />
        </div>

        <div className="mt-16 rounded-3xl bg-cream/40 p-6 sm:p-8">
          <h3 className="font-display text-2xl italic text-ink sm:text-3xl">
            {methodology.intro}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/90 sm:text-base">
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
                  <h5 className="font-display text-lg italic text-ink">{format.name}</h5>
                  <p className="mt-1 text-sm font-medium text-abyss">
                    Obiettivo: {format.objective}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/90">{format.role}</p>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink/90">
                    {format.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
              <p className="rounded-xl border-2 border-dashed border-ink/30 bg-cream/40 p-4 text-sm font-medium text-ink/70">
                {methodology.materialPlaceholder}
              </p>
            </div>
          </ExpandableCard>
        </div>
      </div>
    </section>
  );
}
