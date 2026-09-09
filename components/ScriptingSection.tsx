'use client';

import { motion } from 'framer-motion';
import { scriptingProjects } from '@/lib/content';
import ProjectCard from './ProjectCard';

export default function ScriptingSection() {
  return (
    <section id="scripting" className="scroll-mt-24 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl italic text-ink sm:text-5xl">
            Scripting & Video Storytelling
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/90 sm:text-lg">
            Ideazione, regia e brief di montaggio per format che trasformano la ricerca in
            racconto — dal Reel per una mostra museale alla lezione sui cetacei per le scuole
            medie.
          </p>
        </motion.div>

        <div className="mt-10 space-y-8">
          {scriptingProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
