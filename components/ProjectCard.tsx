'use client';

import { motion } from 'framer-motion';
import { withBasePath } from '@/lib/utils';
import type { ScriptingProject } from '@/lib/content';
import ExpandableCard from './ExpandableCard';
import VideoEmbed from './VideoEmbed';

// Altezza del media fissa (non legata all'aspect ratio della foto sorgente):
// evita che uno screenshot verticale allunghi la card e lasci vuoto sotto al
// testo, più corto, nella colonna affiancata.
const MEDIA_HEIGHT = 'h-[320px] sm:h-[400px] lg:h-[440px]';

export default function ProjectCard({
  project,
  reversed = false,
}: {
  project: ScriptingProject;
  reversed?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 gap-8 rounded-3xl bg-cream/40 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12"
    >
      <div className={reversed ? 'lg:order-2' : ''}>
        {project.media.kind === 'instagram' ? (
          <VideoEmbed
            kind="instagram"
            permalink={project.media.permalink}
            poster={project.media.poster}
            posterAlt={project.media.posterAlt}
            title={project.title}
            mediaHeightClassName={MEDIA_HEIGHT}
          />
        ) : (
          <img
            src={withBasePath(project.media.src)}
            alt={project.media.alt}
            loading="lazy"
            className={`w-full rounded-2xl object-cover ${MEDIA_HEIGHT}`}
          />
        )}
      </div>

      <div className={reversed ? 'lg:order-1' : ''}>
        <span className="inline-block rounded-full bg-abyss px-3 py-1 text-xs font-semibold text-cream">
          {project.badge}
        </span>
        <h3 className="mt-3 font-display text-2xl italic text-ink sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/90 sm:text-base">{project.role}</p>

        <ExpandableCard collapsedLabel={project.ctaLabel} className="mt-6">
          {project.behindTheScenes.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </ExpandableCard>
      </div>
    </motion.article>
  );
}
