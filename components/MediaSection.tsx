'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { withBasePath } from '@/lib/utils';
import { podcastEpisodes, socialContentSamples, documentary } from '@/lib/content';
import PodcastEmbed from './PodcastEmbed';
import VideoEmbed from './VideoEmbed';
import Lightbox from './Lightbox';

const DOC_MEDIA_HEIGHT = 'h-[320px] sm:h-[400px] lg:h-[440px]';

export default function MediaSection() {
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="media" className="scroll-mt-28 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-soft">
            02 — Audio e media
          </p>
          <h2 className="mt-3 font-display font-medium text-4xl italic text-ink sm:text-5xl">Audio e media</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-dim sm:text-lg">
            Content curation e materiali social per la sezione podcast di &quot;Baila
            Murena&quot;, dedicata ad approfondimenti e curiosità sulla vita marina, fino a
            un&apos;esperienza come esperta di analisi dati bioacustici in un documentario
            scientifico.
          </p>
        </motion.div>

        {/* Podcast */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {podcastEpisodes.map((episode) => (
            <PodcastEmbed key={episode.id} episode={episode} />
          ))}
        </div>

        {/* Content sociale curato per Baila Murena: grafica episodi e Stories */}
        <div className="mt-8">
          <p className="mb-3 font-mono text-xs text-ink-faint">
            Content curation social per &quot;Baila Murena&quot; — locandine e Stories interattive
          </p>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {socialContentSamples.map((sample) => (
              <button
                key={sample.src}
                type="button"
                onClick={() => setSelected(sample)}
                className="group flex-none overflow-hidden rounded-xl border border-glass-border focus-visible:outline-offset-4"
                aria-label={`Apri in grande: ${sample.alt}`}
              >
                <img
                  src={withBasePath(sample.src)}
                  alt={sample.alt}
                  loading="lazy"
                  className="h-40 w-auto object-cover transition-transform duration-300 group-hover:scale-105 sm:h-52"
                />
              </button>
            ))}
          </div>
        </div>
        <Lightbox photo={selected} onClose={() => setSelected(null)} />

        {/* Documentario */}
        <div className="mt-16 grid grid-cols-1 gap-8 rounded-3xl border border-glass-border bg-gradient-to-br from-glass to-white/[0.02] p-6 backdrop-blur-sm sm:p-8 lg:grid-cols-2 lg:items-center">
          <VideoEmbed
            kind="vimeo"
            embedUrl={documentary.vimeoEmbedUrl}
            poster={documentary.cover}
            posterAlt={documentary.coverAlt}
            title={documentary.title}
            mediaHeightClassName={DOC_MEDIA_HEIGHT}
          />
          <div>
            <h3 className="font-display font-medium text-2xl italic text-ink sm:text-3xl">
              {documentary.title}
            </h3>
            <p className="mt-2 font-mono text-xs text-cyan-soft">{documentary.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-dim sm:text-base">
              {documentary.description}
            </p>
            <p className="mt-4 text-sm italic leading-relaxed text-ink-faint">
              {documentary.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
