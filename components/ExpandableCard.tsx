'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type ExpandableCardProps = {
  title?: string;
  collapsedLabel?: string;
  expandedLabel?: string;
  children: React.ReactNode;
  className?: string;
};

export default function ExpandableCard({
  title,
  collapsedLabel = 'Scopri di più',
  expandedLabel = 'Chiudi',
  children,
  className = '',
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="inline-flex items-center gap-2 rounded-full bg-abyss px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-abyss-light focus-visible:outline-cream"
      >
        <span>{open ? expandedLabel : collapsedLabel}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          ↓
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-5">
              {title && (
                <h4 className="mb-2 font-display text-lg italic text-ink">{title}</h4>
              )}
              <div className="space-y-3 text-sm leading-relaxed text-ink/90 sm:text-base">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
