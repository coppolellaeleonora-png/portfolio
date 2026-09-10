// Bollicine che risalgono lentamente dal basso, per richiamare l'acqua del
// mare nello sfondo. Valori fissi (non Math.random) per restare identiche
// tra render server e client in export statico. Delay negativi: le bolle
// sono già "in volo" al caricamento invece di partire tutte insieme dal
// fondo pagina.
const BUBBLES = [
  { left: '4%', size: 10, duration: 17, delay: -2, opacity: 0.35 },
  { left: '11%', size: 6, duration: 13, delay: -9, opacity: 0.45 },
  { left: '18%', size: 16, duration: 21, delay: -5, opacity: 0.25 },
  { left: '25%', size: 8, duration: 15, delay: -12, opacity: 0.4 },
  { left: '33%', size: 22, duration: 24, delay: -1, opacity: 0.2 },
  { left: '40%', size: 5, duration: 12, delay: -7, opacity: 0.5 },
  { left: '48%', size: 13, duration: 19, delay: -15, opacity: 0.3 },
  { left: '55%', size: 7, duration: 14, delay: -4, opacity: 0.45 },
  { left: '62%', size: 18, duration: 22, delay: -18, opacity: 0.22 },
  { left: '69%', size: 9, duration: 16, delay: -10, opacity: 0.4 },
  { left: '76%', size: 14, duration: 20, delay: -6, opacity: 0.28 },
  { left: '83%', size: 6, duration: 13, delay: -14, opacity: 0.5 },
  { left: '90%', size: 20, duration: 23, delay: -3, opacity: 0.2 },
  { left: '96%', size: 8, duration: 15, delay: -16, opacity: 0.4 },
  { left: '8%', size: 12, duration: 18, delay: -20, opacity: 0.32 },
  { left: '58%', size: 10, duration: 17, delay: -22, opacity: 0.35 },
];

export default function Bubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full border border-cyan-soft/30 bg-gradient-to-b from-white/15 to-cyan/5 animate-rise"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            ['--bubble-opacity' as string]: b.opacity,
          }}
        />
      ))}
    </div>
  );
}
