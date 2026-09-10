'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

// Sottile barra sfumata in alto che segue l'avanzamento dello scroll —
// un tocco da prodotto moderno, discreto ma presente su tutta la pagina.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan/0 via-cyan to-cyan/0"
    />
  );
}
