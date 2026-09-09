'use client';

import { useEffect, useState } from 'react';
import { withBasePath } from '@/lib/utils';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

type VideoEmbedProps = {
  poster: string;
  posterAlt: string;
  title: string;
  // Altezza fissa del poster (prima del click), per evitare che screenshot
  // verticali molto alti dominino il layout della card.
  mediaHeightClassName?: string;
} & (
  | { kind: 'instagram'; permalink: string }
  | { kind: 'vimeo'; embedUrl: string }
);

// Componente "già predisposto" per un embed reale: mostra sempre lo
// screenshot come poster con badge di riproduzione, e al click carica
// l'embed effettivo (Instagram embed.js oppure iframe Vimeo). Per
// sostituire la fonte in futuro basta cambiare permalink/embedUrl in
// lib/content.ts — nessun layout da rifare.
export default function VideoEmbed(props: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded || props.kind !== 'instagram') return;

    const existingScript = document.getElementById('instagram-embed-script');
    if (existingScript) {
      window.instgrm?.Embeds.process();
      return;
    }

    const script = document.createElement('script');
    script.id = 'instagram-embed-script';
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, [loaded, props.kind]);

  if (loaded) {
    if (props.kind === 'instagram') {
      return (
        <div className="w-full overflow-hidden rounded-2xl bg-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={props.permalink}
            data-instgrm-version="14"
            style={{ margin: 0, width: '100%' }}
          />
        </div>
      );
    }

    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
        <iframe
          src={props.embedUrl}
          title={props.title}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group relative block w-full overflow-hidden rounded-2xl focus-visible:outline-offset-4"
      aria-label={`Riproduci: ${props.title}`}
    >
      <img
        src={withBasePath(props.poster)}
        alt={props.posterAlt}
        loading="lazy"
        className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
          props.mediaHeightClassName ?? 'aspect-[4/5]'
        }`}
      />
      <span className="absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors group-hover:bg-ink/40">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 text-2xl text-abyss shadow-lg">
          ▶
        </span>
      </span>
      <span className="absolute bottom-3 left-3 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-ink">
        {props.kind === 'instagram' ? 'Guarda il Reel su Instagram' : 'Guarda il video'}
      </span>
    </button>
  );
}
