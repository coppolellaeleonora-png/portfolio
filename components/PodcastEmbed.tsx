'use client';

import { motion } from 'framer-motion';
import type { PodcastEpisode } from '@/lib/content';

export default function PodcastEmbed({ episode }: { episode: PodcastEpisode }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-cream/40 p-6 sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-abyss">{episode.code}</p>
      <h3 className="mt-1 font-display text-xl italic text-ink sm:text-2xl">{episode.title}</h3>

      <div className="mt-4 overflow-hidden rounded-xl">
        <iframe
          title={`Player Spotify — ${episode.title}`}
          src={episode.spotifyEmbedUrl}
          width="100%"
          height="152"
          style={{ border: 0 }}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>

      <div className="mt-4 space-y-1 text-sm leading-relaxed text-ink/90">
        <p>{episode.lineTopic}</p>
        <p>{episode.lineStructure}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {episode.listenLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-abyss underline decoration-abyss/40 underline-offset-4 hover:decoration-abyss"
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.article>
  );
}
