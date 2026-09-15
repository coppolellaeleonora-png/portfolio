'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
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
  | {
      kind: 'vimeo';
      embedUrl: string;
      // Secondo da cui far partire la riproduzione. Il seek è fatto via
      // Vimeo Player SDK (non via #t= nell'URL): l'SDK garantisce che il
      // salto al minuto giusto sia completato PRIMA di avviare il play,
      // evitando che si veda per un istante il fotogramma iniziale del
      // video (schermata scura/copertina) prima di saltare a quello giusto.
      startSeconds?: number;
    }
);

// Ricava l'URL della pagina embed dedicata di Instagram da un permalink
// (es. https://www.instagram.com/reel/ABC123/ -> .../reel/ABC123/embed/captioned/).
// Usata solo come fallback quando non è disponibile una registrazione dello
// schermo (localVideo) per il Reel.
function toEmbedUrl(permalink: string): string {
  const trimmed = permalink.replace(/\/?$/, '/');
  return `${trimmed}embed/captioned/`;
}

declare global {
  interface Window {
    Vimeo?: { Player: new (element: HTMLIFrameElement) => VimeoPlayerInstance };
  }
}

type VimeoPlayerInstance = {
  ready: () => Promise<void>;
  setCurrentTime: (seconds: number) => Promise<number>;
  play: () => Promise<void>;
  destroy: () => Promise<void>;
  on: (event: string, callback: () => void) => void;
};

let vimeoScriptPromise: Promise<void> | null = null;

function loadVimeoPlayerScript(): Promise<void> {
  if (window.Vimeo?.Player) return Promise.resolve();
  if (!vimeoScriptPromise) {
    vimeoScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Impossibile caricare Vimeo Player SDK'));
      document.body.appendChild(script);
    });
  }
  return vimeoScriptPromise;
}

// Iframe Vimeo pilotato via Player SDK: mentre l'iframe carica, cerca al
// minuto giusto e avvia la riproduzione, la copertina statica (la stessa
// foto dell'anteprima, non quella scura di Vimeo) resta sopra — niente
// schermate scure o fotogrammi sbagliati "di passaggio". Sparisce solo
// all'evento 'playing', quando il fotogramma giusto è realmente a schermo.
function VimeoEmbed({
  embedUrl,
  title,
  startSeconds,
  poster,
  posterAlt,
  className,
}: {
  embedUrl: string;
  title: string;
  startSeconds?: number;
  poster: string;
  posterAlt: string;
  className: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showPoster, setShowPoster] = useState(true);

  useEffect(() => {
    if (!startSeconds) {
      setShowPoster(false);
      return;
    }
    let cancelled = false;
    let player: VimeoPlayerInstance | undefined;
    const reveal = () => {
      if (!cancelled) setShowPoster(false);
    };
    // Rete lenta o SDK bloccato: non restare bloccati sulla copertina.
    const safetyTimeout = window.setTimeout(reveal, 8000);

    loadVimeoPlayerScript()
      .then(() => {
        if (cancelled || !iframeRef.current || !window.Vimeo) throw new Error('no sdk');
        player = new window.Vimeo.Player(iframeRef.current);
        player.on('playing', reveal);
        return player.ready().then(() => {
          if (cancelled || !player) return;
          return player.setCurrentTime(startSeconds).then(() => player?.play());
        });
      })
      .catch(reveal);

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimeout);
      player?.destroy?.().catch(() => {});
    };
  }, [startSeconds]);

  return (
    <div className="relative h-full w-full">
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={title}
        className={className}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      />
      {showPoster && (
        <img
          src={withBasePath(poster)}
          alt={posterAlt}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export default function VideoEmbed(props: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const isReel = props.variant === 'reel';
  const hasLocalVideo = props.kind === 'instagram' && Boolean(props.localVideo);

  // Stessa classe di formato per anteprima e video caricato, applicata
  // all'elemento con il bordo (bottone/contenitore) in entrambi i casi:
  // altrimenti il bordo del bottone (auto, si somma all'altezza) e quello
  // del contenitore (incluso nell'altezza esplicita) differiscono di
  // qualche pixel e la card cambia comunque leggermente formato al click.
  // Per i Reel coincide con l'aspect ratio reale della registrazione dello
  // schermo (1080x1950), non un 3:5 generico: così non serve nemmeno
  // tagliare verticalmente le scritte in basso al video.
  const mediaSizeClassName = isReel
    ? hasLocalVideo
      ? 'aspect-[1080/1950]'
      : 'aspect-[3/5]'
    : (props.mediaHeightClassName ?? 'aspect-[4/5]');

  const boxClassName = `overflow-hidden rounded-2xl border border-glass-border bg-glass ${
    isReel ? 'w-full' : 'w-full bg-black'
  } ${mediaSizeClassName}`;

  let media: ReactNode;

  if (loaded && hasLocalVideo && props.kind === 'instagram') {
    media = (
      <div className={boxClassName}>
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
  } else if (loaded && props.kind === 'vimeo') {
    media = (
      <div className={boxClassName}>
        <VimeoEmbed
          embedUrl={props.embedUrl}
          title={props.title}
          startSeconds={props.startSeconds}
          poster={props.poster}
          posterAlt={props.posterAlt}
          className="h-full w-full"
        />
      </div>
    );
  } else if (loaded) {
    const embedUrl = props.kind === 'instagram' ? toEmbedUrl(props.permalink) : '';
    media = (
      <div className={boxClassName}>
        <iframe
          src={embedUrl}
          title={props.title}
          className="h-full w-full"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>
    );
  } else {
    media = (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className={`group relative block focus-visible:outline-offset-4 ${boxClassName}`}
        aria-label={`Riproduci: ${props.title}`}
      >
        <img
          src={withBasePath(props.poster)}
          alt={props.posterAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
