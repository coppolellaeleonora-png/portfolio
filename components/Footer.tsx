import { contact, hero } from '@/lib/content';

export default function Footer() {
  return (
    <footer id="contatti" className="scroll-mt-28 px-4 py-24 sm:px-8">
      <div className="relative mx-auto max-w-content overflow-hidden rounded-[2rem] border border-glass-border bg-gradient-to-br from-glass to-white/[0.03] p-10 text-center backdrop-blur-sm sm:p-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-[100px]" />
        <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-cyan-soft">
          04 — Contatti
        </p>
        <h2 className="relative mt-4 font-display font-medium text-3xl italic text-ink sm:text-5xl">
          Parliamo di scienza, insieme
        </h2>
        <p className="relative mt-4 text-ink-dim">
          {hero.name} — {contact.location}
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="rounded-full bg-gradient-to-r from-cyan-soft to-cyan-deep px-6 py-3 text-sm font-semibold text-abyss-950 shadow-glow transition-transform hover:scale-[1.03]"
          >
            {contact.email}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-glass-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-cyan/50 hover:text-cyan-soft"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <p className="mt-8 text-center font-mono text-xs text-ink-faint">
        © {new Date().getFullYear()} {hero.name}. Portfolio realizzato con Next.js.
      </p>
    </footer>
  );
}
