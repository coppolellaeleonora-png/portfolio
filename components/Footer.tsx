import { contact, hero } from '@/lib/content';

export default function Footer() {
  return (
    <footer id="contatti" className="scroll-mt-24 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-content rounded-3xl bg-cream/40 p-8 text-center sm:p-12">
        <h2 className="font-display text-3xl italic text-ink sm:text-4xl">
          Parliamo di scienza, insieme
        </h2>
        <p className="mt-3 text-ink/80">{hero.name} — {contact.location}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="rounded-full bg-abyss px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-abyss-light"
          >
            {contact.email}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink/30 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-ink/60">
        © {new Date().getFullYear()} {hero.name}. Portfolio realizzato con Next.js.
      </p>
    </footer>
  );
}
