import Bubbles from './Bubbles';

// Sfondo fisso dell'intero sito: qualche macchia di colore sfocata e in
// lento movimento (sempre nei toni blu/ciano), bollicine che risalgono e una
// texture di grana leggerissima, per dare profondità e richiamare il mare
// senza distrarre dal contenuto. Renderizzato una sola volta nel layout,
// dietro a tutto (pointer-events-none).
export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-abyss-800 via-abyss-900 to-abyss-950">
      <div className="absolute -left-1/4 -top-1/4 h-[70vh] w-[70vh] animate-drift rounded-full bg-cyan/25 blur-[120px]" />
      <div className="absolute -right-1/4 top-1/3 h-[60vh] w-[60vh] animate-drift-slow rounded-full bg-abyss-600/70 blur-[140px]" />
      <div className="absolute bottom-[-20%] left-1/4 h-[55vh] w-[55vh] animate-drift rounded-full bg-cyan-deep/20 blur-[130px]" />
      <div className="absolute right-[10%] bottom-[10%] h-[45vh] w-[45vh] animate-drift-slow rounded-full bg-cyan-soft/10 blur-[110px]" />
      <Bubbles />
      <div className="absolute inset-0 bg-grain mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-abyss-950" />
    </div>
  );
}
