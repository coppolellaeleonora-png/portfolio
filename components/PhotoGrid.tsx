'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { withBasePath } from '@/lib/utils';
import Lightbox from './Lightbox';

type Photo = { src: string; alt: string };

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<Photo | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-4">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            type="button"
            onClick={() => setSelected(photo)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-glass-border transition-colors hover:border-cyan/40 focus-visible:outline-offset-4"
            aria-label={`Apri in grande: ${photo.alt}`}
          >
            <img
              src={withBasePath(photo.src)}
              alt={photo.alt}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss-950/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>
      <Lightbox photo={selected} onClose={() => setSelected(null)} />
    </>
  );
}
