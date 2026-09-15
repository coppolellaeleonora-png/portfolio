'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { withBasePath } from '@/lib/utils';

type Photo = { src: string; alt: string };

export default function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const open = index !== null;
  const photo = open ? photos[index] : null;
  const hasMultiple = photos.length > 1;

  const goTo = (delta: number) => {
    if (index === null) return;
    onNavigate((index + delta + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goTo(1);
      if (e.key === 'ArrowLeft') goTo(-1);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-abyss-950/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
          onClick={onClose}
        >
          <motion.img
            key={photo.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            src={withBasePath(photo.src)}
            alt={photo.alt}
            className="max-h-[90vh] max-w-full rounded-xl border border-glass-border object-contain shadow-glow-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(-1);
                }}
                aria-label="Foto precedente"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-glass-border bg-abyss-900/80 text-xl text-ink backdrop-blur-sm transition-colors hover:border-cyan/40 hover:text-cyan-soft sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(1);
                }}
                aria-label="Foto successiva"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-glass-border bg-abyss-900/80 text-xl text-ink backdrop-blur-sm transition-colors hover:border-cyan/40 hover:text-cyan-soft sm:right-6"
              >
                ›
              </button>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-glass-border bg-abyss-900/80 px-3 py-1 font-mono text-xs text-ink-dim backdrop-blur-sm">
                {index! + 1} / {photos.length}
              </span>
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi immagine"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-abyss-900/80 text-lg font-bold text-ink backdrop-blur-sm transition-colors hover:border-cyan/40 hover:text-cyan-soft"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
