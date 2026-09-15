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
      <motion.button
        type="button"
        layout
        transition={{ layout: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className={`group inline-flex items-center gap-2 overflow-hidden rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
          open
            ? 'border-cyan/50 bg-gradient-to-r from-cyan/15 to-cyan-deep/10 text-cyan-soft'
            : 'border-glass-border bg-gradient-to-br from-glass to-white/[0.02] text-ink hover:border-cyan/40 hover:from-glass-hover hover:text-cyan-soft'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            {open ? expandedLabel : collapsedLabel}
          </motion.span>
        </AnimatePresence>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          ↓
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="pt-5">
              {title && (
                <h4 className="mb-2 font-display font-medium text-lg italic text-ink">{title}</h4>
              )}
              <div className="space-y-3 text-sm leading-relaxed text-ink-dim sm:text-base">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
