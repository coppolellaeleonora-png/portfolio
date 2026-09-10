'use client';

import { motion } from 'framer-motion';
import { scriptingProjects } from '@/lib/content';
import ProjectCard from './ProjectCard';

export default function ScriptingSection() {
  return (
    <section id="scripting" className="scroll-mt-28 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-soft">
            01 — Storytelling e contenuti
          </p>
          <h2 className="mt-3 font-display font-medium text-4xl italic text-ink sm:text-5xl">
            Storytelling e contenuti
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-dim sm:text-lg">
            Ideazione, scalette e brief di montaggio per contenuti che trasformano la ricerca in
            racconto — dal Reel per una mostra museale alla lezione sui cetacei per le scuole
            medie.
          </p>
        </motion.div>

        <div className="mt-12 space-y-8">
          {scriptingProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
