'use client';

import { useState, type ReactNode } from 'react';
import { withBasePath } from '@/lib/utils';

type VideoEmbedProps = {
  poster: string;
  posterAlt: string;
  title: string;
  // Altezza fissa del poster (prima del click) per il variant "wide" (es. il
  // documentario): stessa altezza usata anche dopo il click, per evitare che
  // il formato della card cambi (e con esso il layout sotto) al passaggio
  // da anteprima a video.
  mediaHeightClassName?: string;
  // "reel" mostra il contenuto nel suo formato verticale nativo (da
  // telefono), centrato e non stirato — pensato per i Reel Instagram, che
  // altrimenti verrebbero forzati in un riquadro largo e tagliati male.
  // "wide" (default) mantiene il comportamento precedente.
  variant?: 'reel' | 'wide';
} & (
  | {
      kind: 'instagram';
      permalink: string;
      // Screen recording del Reel (UI Instagram in dark mode inclusa): se
      // presente viene riprodotta al posto dell'iframe embed di Instagram,
      // la cui veste grafica bianca stona col tema scuro del sito. Il link
      // per vedere il Reel sulla vera pagina Instagram resta comunque
      // sempre visibile sotto al video, mai sovrapposto.
      localVideo?: string;
    }
  | { kind: 'vimeo'; embedUrl: string }
);

// Ricava l'URL della pagina embed dedicata di Instagram da un permalink
// (es. https://www.instagram.com/reel/ABC123/ -> .../reel/ABC123/embed/captioned/).
// Usata solo come fallback quando non è disponibile una registrazione dello
// schermo (localVideo) per il Reel.
function toEmbedUrl(permalink: string): string {
  const trimmed = permalink.replace(/\/?$/, '/');
  return `${trimmed}embed/captioned/`;
}

export default function VideoEmbed(props: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const isReel = props.variant === 'reel';
  const hasLocalVideo = props.kind === 'instagram' && Boolean(props.localVideo);

  // Stessa classe di formato per anteprima e video caricato, altrimenti la
  // card cambia altezza al click (e sposta tutto quello che viene dopo).
  // Per i Reel coincide con l'aspect ratio reale della registrazione dello
  // schermo (1080x1950), non un 3:5 generico: così non serve nemmeno
  // tagliare verticalmente le scritte in basso al video.
  const mediaSizeClassName = isReel
    ? hasLocalVideo
      ? 'aspect-[1080/1950]'
      : 'aspect-[3/5]'
    : (props.mediaHeightClassName ?? 'aspect-[4/5]');

  const containerClassName = `overflow-hidden rounded-2xl border border-glass-border bg-glass ${
    isReel ? 'w-full' : 'w-full bg-black'
  } ${mediaSizeClassName}`;

  let media: ReactNode;

  if (loaded && hasLocalVideo && props.kind === 'instagram') {
    media = (
      <div className={containerClassName}>
        <video
          src={withBasePath(props.localVideo!)}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        >
          <track kind="captions" />
        </video>
      </div>
    );
  } else if (loaded) {
    const embedUrl = props.kind === 'instagram' ? toEmbedUrl(props.permalink) : props.embedUrl;
    media = (
      <div className={containerClassName}>
        <iframe
          src={embedUrl}
          title={props.title}
          className="h-full w-full"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen={props.kind === 'vimeo'}
        />
      </div>
    );
  } else {
    media = (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-glass-border focus-visible:outline-offset-4"
        aria-label={`Riproduci: ${props.title}`}
      >
        <img
          src={withBasePath(props.poster)}
          alt={props.posterAlt}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${mediaSizeClassName}`}
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-cyan/40" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan/50 bg-gradient-to-br from-abyss-800/90 to-abyss-900/90 text-xl text-cyan-soft backdrop-blur-sm transition-transform group-hover:scale-110">
              ▶
            </span>
          </span>
        </span>
      </button>
    );
  }

  const caption =
    props.kind === 'instagram' ? (
      <a
        href={props.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-cyan-soft underline decoration-cyan/30 underline-offset-4 hover:decoration-cyan"
      >
        Guarda il Reel su Instagram
        <span aria-hidden="true">↗</span>
      </a>
    ) : (
      <p className="mt-3 font-mono text-xs text-cyan-soft">Guarda il video</p>
    );

  return (
    <div className={isReel ? 'mx-auto w-full max-w-[320px] sm:max-w-[360px]' : 'w-full'}>
      {media}
      {caption}
    </div>
  );
}
