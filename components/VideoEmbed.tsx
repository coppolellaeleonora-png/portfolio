'use client';

import { useState } from 'react';
import { withBasePath } from '@/lib/utils';

type VideoEmbedProps = {
  poster: string;
  posterAlt: string;
  title: string;
  // Altezza fissa del poster (prima del click) per il variant "wide" (es. il
  // documentario), per evitare che uno screenshot molto alto domini la card.
  mediaHeightClassName?: string;
  // "reel" mostra il contenuto nel suo formato verticale nativo (da
  // telefono), centrato e non stirato — pensato per i Reel Instagram, che
  // altrimenti verrebbero forzati in un riquadro largo e tagliati male.
  // "wide" (default) mantiene il comportamento precedente.
  variant?: 'reel' | 'wide';
} & (
  | { kind: 'instagram'; permalink: string }
  | { kind: 'vimeo'; embedUrl: string }
);

// Ricava l'URL della pagina embed dedicata di Instagram da un permalink
// (es. https://www.instagram.com/reel/ABC123/ -> .../reel/ABC123/embed/captioned/).
// Renderizzata in un <iframe> vero (non il widget blockquote + embed.js, che
// si è dimostrato inaffidabile con più Reel sulla stessa pagina). L'iframe
// nativo di Instagram ha però una veste grafica bianca che stona con il tema
// scuro del sito: per questo resta nascosto dietro la copertina (screenshot
// reale + play button) finché non viene cliccato, invece di caricarsi da solo.
function toEmbedUrl(permalink: string): string {
  const trimmed = permalink.replace(/\/?$/, '/');
  return `${trimmed}embed/captioned/`;
}

export default function VideoEmbed(props: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const isReel = props.variant === 'reel';

  if (loaded) {
    const embedUrl = props.kind === 'instagram' ? toEmbedUrl(props.permalink) : props.embedUrl;
    return (
      <div
        className={`overflow-hidden rounded-2xl border border-glass-border bg-glass ${
          isReel
            ? 'mx-auto aspect-[3/5] w-full max-w-[320px] sm:max-w-[360px]'
            : 'aspect-video w-full bg-black'
        }`}
      >
        <iframe
          src={embedUrl}
          title={props.title}
          className="h-full w-full"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen={props.kind === 'vimeo'}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className={`group relative block overflow-hidden rounded-2xl border border-glass-border focus-visible:outline-offset-4 ${
        isReel ? 'mx-auto w-full max-w-[320px] sm:max-w-[360px]' : 'w-full'
      }`}
      aria-label={`Riproduci: ${props.title}`}
    >
      <img
        src={withBasePath(props.poster)}
        alt={props.posterAlt}
        loading="lazy"
        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          isReel ? 'aspect-[3/5]' : (props.mediaHeightClassName ?? 'aspect-[4/5]')
        }`}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-abyss-950/85 via-abyss-950/10 to-transparent transition-opacity group-hover:from-abyss-950/70" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-cyan/40" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan/50 bg-gradient-to-br from-abyss-800/90 to-abyss-900/90 text-xl text-cyan-soft backdrop-blur-sm transition-transform group-hover:scale-110">
            ▶
          </span>
        </span>
      </span>
      <span className="absolute bottom-3 left-3 rounded-full border border-glass-border bg-abyss-900/80 px-3 py-1 font-mono text-[11px] text-cyan-soft backdrop-blur-sm">
        {props.kind === 'instagram' ? 'Guarda il Reel su Instagram' : 'Guarda il video'}
      </span>
    </button>
  );
}
