'use client';

import { motion } from 'framer-motion';
import { withBasePath } from '@/lib/utils';
import type { ScriptingProject } from '@/lib/content';
import ExpandableCard from './ExpandableCard';
import VideoEmbed from './VideoEmbed';

// Altezza del media fissa (non legata all'aspect ratio della foto sorgente):
// evita che uno screenshot verticale allunghi la card e lasci vuoto sotto al
// testo, più corto, nella colonna affiancata. Non si applica ai Reel
// Instagram, mostrati invece nel loro formato verticale "da telefono".
const MEDIA_HEIGHT = 'h-[320px] sm:h-[400px] lg:h-[440px]';

export default function ProjectCard({
  project,
  index,
  reversed = false,
}: {
  project: ScriptingProject;
  index: number;
  reversed?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="group relative grid grid-cols-1 gap-8 rounded-3xl border border-glass-border bg-gradient-to-br from-glass to-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-cyan/30 hover:from-glass-hover sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12"
    >
      <span className="pointer-events-none absolute right-6 top-6 font-mono text-xs text-ink-faint sm:right-8 sm:top-8">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className={reversed ? 'lg:order-2' : ''}>
        {project.media.kind === 'instagram' ? (
          <VideoEmbed
            kind="instagram"
            permalink={project.media.permalink}
            poster={project.media.poster}
            posterAlt={project.media.posterAlt}
            title={project.title}
            variant="reel"
          />
        ) : (
          <img
            src={withBasePath(project.media.src)}
            alt={project.media.alt}
            loading="lazy"
            className={`w-full rounded-2xl border border-glass-border object-cover ${
              project.media.aspectClassName ?? MEDIA_HEIGHT
            }`}
          />
        )}
      </div>

      <div className={reversed ? 'lg:order-1' : ''}>
        <span className="inline-block rounded-full border border-cyan/30 bg-gradient-to-r from-cyan/20 to-cyan-deep/10 px-3 py-1 font-mono text-[11px] text-cyan-soft">
          {project.attribution}
        </span>
        <h3 className="mt-4 font-display font-medium text-2xl italic text-ink sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim sm:text-base">{project.role}</p>

        <ExpandableCard collapsedLabel={project.ctaLabel} className="mt-6">
          {project.behindTheScenes.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </ExpandableCard>
      </div>
    </motion.article>
  );
}
