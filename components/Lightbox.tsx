'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { withBasePath } from '@/lib/utils';

type Photo = { src: string; alt: string };

export default function Lightbox({
  photo,
  onClose,
}: {
  photo: Photo | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!photo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [photo, onClose]);

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
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            src={withBasePath(photo.src)}
            alt={photo.alt}
            className="max-h-[90vh] max-w-full rounded-xl border border-glass-border object-contain shadow-glow-lg"
            onClick={(e) => e.stopPropagation()}
          />
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
