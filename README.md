# Eleonora Coppolella — Portfolio

Portfolio professionale di Eleonora Coppolella, biologa marina specializzata in
bioacustica e content creator / scientific storyteller. Sito statico realizzato
con Next.js (App Router), Tailwind CSS e Framer Motion, pensato per il deploy
su GitHub Pages tramite GitHub Actions.

## Stack

- **Next.js 14** (App Router) con `output: 'export'` → export statico puro.
- **Tailwind CSS** per lo styling.
- **Framer Motion** per le animazioni (fade-in on scroll, accordion, hover).
- Nessun database/backend: tutti i contenuti vivono in [`lib/content.ts`](lib/content.ts).

## Sviluppo locale

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000). In sviluppo il sito non
applica il `basePath` (vedi sotto), quindi i link sono tutti relativi alla
root.

## Build statico

```bash
npm run build
```

Genera l'export statico nella cartella `out/`, pronta per essere pubblicata
così com'è su qualunque hosting statico (incluso GitHub Pages).

## Deploy su GitHub Pages

Il workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builda ed esegue il deploy automaticamente a ogni push su `main`, usando
`actions/deploy-pages`. Per attivarlo la prima volta:

1. Su GitHub, vai in **Settings → Pages** e imposta **Source: GitHub Actions**.
2. Fai push su `main`: il workflow builda il progetto e pubblica il contenuto
   di `out/`.

### ⚠️ Configurazione del sotto-path (basePath)

GitHub Pages serve i repository (diversi da `<username>.github.io`) sotto un
sotto-path `https://<username>.github.io/<nome-repo>/`. Perché immagini, link
interni e asset funzionino correttamente, il nome del repository è centralizzato
in **una sola costante**:

```js
// next.config.js
const REPO_NAME = 'ele-portfolio';
```

**Il progetto è attualmente configurato per essere testato sul profilo GitHub
di Tomas** (`iltommi1995`), come da accordo iniziale — vedi `site.url` in
[`lib/content.ts`](lib/content.ts) che punta a
`https://iltommi1995.github.io/ele-portfolio/`.

**Quando si è pronti a pubblicare sul profilo di Eleonora**, occorre:

1. Se cambia anche il **nome del repository**, aggiornare `REPO_NAME` in
   `next.config.js`.
2. Aggiornare `site.url` in `lib/content.ts` con lo username/dominio definitivo
   (usato per i meta tag Open Graph/Twitter e per i link assoluti).
3. Se il repository verrà trasferito/ricreato sotto l'account di Eleonora,
   verificare che **Settings → Pages → Source** sia impostato su *GitHub
   Actions* anche nel nuovo repository.

Nessun'altra modifica è necessaria: tutte le immagini e i link interni usano
già l'helper `withBasePath()` (vedi [`lib/utils.ts`](lib/utils.ts)) o i
meccanismi nativi di Next.js, quindi seguono automaticamente `REPO_NAME`.

## Sostituire gli embed video quando saranno disponibili nuovi contenuti

I Reel Instagram, il documentario e gli episodi podcast **sono già collegati
ai contenuti reali** (link Instagram, Spotify, Vimeo trovati nei materiali
forniti) tramite il componente [`VideoEmbed`](components/VideoEmbed.tsx): lo
screenshot viene mostrato come poster con un badge di riproduzione, e al click
viene caricato l'embed vero e proprio (Instagram `embed.js` oppure iframe
Vimeo). Il componente è già pronto per qualunque contenuto futuro: per
aggiornare o aggiungere un video **non serve toccare il layout**, basta
modificare i dati in `lib/content.ts`:

```ts
// esempio: sostituire/aggiungere un Reel in scriptingProjects
media: {
  kind: 'instagram',
  permalink: 'https://www.instagram.com/reel/NUOVO_ID/',
  poster: '/images/projects/nuovo-poster.webp', // vedi sotto per generarlo
  posterAlt: 'Descrizione alternativa per l\'accessibilità',
},
```

Per il player Spotify, aggiorna `spotifyEmbedUrl` con
`https://open.spotify.com/embed/episode/<ID_EPISODIO>`; per il documentario,
`vimeoEmbedUrl` con `https://player.vimeo.com/video/<ID>?h=<HASH>`.

## Aggiungere o sostituire immagini

Le immagini reali (foto, screenshot, grafiche) vivono come sorgente in `data/`
(escluso da git, vedi sotto) e vengono convertite in WebP ottimizzate dentro
`public/images/` dallo script:

```bash
npm run optimize-images
```

Per aggiungere una nuova immagine: metti il file sorgente in `data/`, aggiungi
una riga al `MANIFEST` in [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs)
(percorso sorgente, cartella/nome di output, larghezza massima), poi rilancia
lo script. Le immagini generate in `public/images/` **sono tracciate da git**
(sono già ottimizzate e pesano pochi KB ciascuna), mentre `data/` e
`mockup-examples/` sono nel `.gitignore`: contengono materiale grezzo ad alta
risoluzione non necessario al sito pubblicato.

## Perché `<img>` invece di `next/image`

Con `output: 'export'` l'ottimizzazione immagini di Next richiede
`images.unoptimized: true` (nessun server disponibile su GitHub Pages per
ridimensionare le immagini a runtime). Le immagini vengono quindi già
pre-ottimizzate in fase di build da `optimize-images.mjs`, e i componenti
usano tag `<img>` nativi con `loading="lazy"` — scelta più semplice e
altrettanto performante in questo scenario.

## Struttura dei componenti

```
components/
  Nav.tsx            Barra di navigazione sticky con sezione attiva evidenziata
  Hero.tsx           Sezione 1 — Header & Intro
  ScriptingSection.tsx  Sezione 2 — Scripting & Video Storytelling
  ProjectCard.tsx    Card progetto (media + testo + accordion "dietro le quinte")
  TimelineSteps.tsx  Timeline orizzontale/verticale per il progetto concept
  MediaSection.tsx   Sezione 3 — Audio, Media & TV
  PodcastEmbed.tsx   Player Spotify + testo fisso + clip audio evidenziata
  PressGrid.tsx       Griglia rassegna stampa (con card placeholder se mancante)
  LiveSection.tsx    Sezione 4 — Live Experience & Divulgazione Scuole
  PhotoGrid.tsx      Griglia fotografica con lightbox al click
  Lightbox.tsx       Modale immagine a schermo intero
  ExpandableCard.tsx Accordion generico "Scopri di più" (Framer Motion)
  VideoEmbed.tsx     Poster + badge play → embed reale al click (Instagram/Vimeo)
  Footer.tsx         Sezione Contatti
```

Tutti i testi e i dati (inclusi i link reali a Instagram/Spotify/Vimeo) sono
centralizzati in [`lib/content.ts`](lib/content.ts): per modificare un testo o
un link non serve toccare i componenti.

## Contenuti ancora da completare

Cerca `[CONTENUTO DA COMPLETARE` in `lib/content.ts` per trovare i due punti
dove non era disponibile materiale reale al momento della generazione del
sito:

1. **Rassegna stampa** (`pressItems`): nessun articolo/intervista con link
   esterno era presente in `data/`. Sostituisci la voce placeholder con le
   card reali (titolo, testata, url, screenshot) non appena disponibili.
2. **Scheda didattica scaricabile** (`methodology.materialPlaceholder`): il
   testo dei format didattici è già integrato per intero (fonte:
   `02_Divulgazione_Scuole_e_Live/00_Schede_Progetti_Didattici.docx`), ma non
   esisteva un PDF/slide da rendere scaricabile. Aggiungi il file in
   `public/` e collega un link di download quando disponibile.

## Contatti mostrati nel sito

Su richiesta, il sito mostra solo **email e LinkedIn** (non il numero di
telefono, presente nei materiali ma escluso per scelta di privacy). Per
modificarli: `contact` in `lib/content.ts`.
