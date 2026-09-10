// Converte e ridimensiona le immagini sorgenti da data/ in WebP ottimizzate
// dentro public/images/, pronte per l'export statico.
// Uso: npm run optimize-images (va rilanciato se si sostituiscono gli asset in data/).

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const OUT = path.join(ROOT, 'public', 'images');

// { src: percorso relativo a data/, out: cartella/nome output senza estensione,
//   width: larghezza massima in px, quality: qualità webp,
//   crop?: {left,top,width,height} applicato PRIMA del resize (in px, sull'immagine
//   già raddrizzata secondo l'EXIF) — usato per escludere persone/elementi indesiderati
//   da una foto altrimenti utile, quando non esiste uno scatto già pulito. }
const MANIFEST = [
  // --- Hero ---
  // Fotogramma del documentario TursioNet: la si vede parlare, in un unico
  // scatto pulito. Il crop rimuove la fascia inferiore con nome/logo e le
  // icone di controllo del player, sovrimpresse nello screenshot originale.
  {
    src: '03_Esperienze_Editoriali_e_Media/03_01_Screen_Documentario.jpg',
    out: 'hero/eleonora-hero',
    crop: { left: 0, top: 100, width: 1909, height: 740 },
    width: 1800,
    quality: 90,
  },

  // --- Sezione 2: Scripting & Video Storytelling ---
  {
    src: '03_Esperienze_Editoriali_e_Media/01_01_Screen_Reel_Museo.jpg',
    out: 'projects/reel-museo-poster',
    width: 1000,
    quality: 80,
  },
  {
    src: '03_Esperienze_Editoriali_e_Media/01_02_Screen_Reel_Cetacei.jpg',
    out: 'projects/reel-cetacei-poster',
    width: 1000,
    quality: 80,
  },
  {
    src: '03_Esperienze_Editoriali_e_Media/02_01_Rubrica_Slide1.jpg',
    out: 'projects/rubrica-slide-1',
    width: 900,
    quality: 82,
  },
  {
    src: '03_Esperienze_Editoriali_e_Media/02_02_Rubrica_Slide2.jpg',
    out: 'projects/rubrica-slide-2',
    width: 700,
    quality: 80,
  },
  {
    src: '03_Esperienze_Editoriali_e_Media/02_03_Rubrica_Slide3.jpg',
    out: 'projects/rubrica-slide-3',
    width: 700,
    quality: 80,
  },
  {
    src: '03_Esperienze_Editoriali_e_Media/02_04_Rubrica_Slide4.jpg',
    out: 'projects/rubrica-slide-4',
    width: 700,
    quality: 80,
  },
  {
    src: '02_Divulgazione_Scuole_e_Live/02_lezione_scuola_media.jpg',
    out: 'projects/lezione-cetacei-scuola',
    width: 1000,
    quality: 80,
  },

  // --- Sezione 3: Audio, Media & TV ---
  {
    src: '03_Esperienze_Editoriali_e_Media/03_01_Screen_Documentario.jpg',
    out: 'media/documentario-cover',
    width: 1200,
    quality: 82,
  },
  {
    src: '01_Podcast_e_Social/01_grafica_locandina_s3e1.png',
    out: 'media/locandina-s3e1',
    width: 500,
    quality: 78,
  },
  {
    src: '01_Podcast_e_Social/02_grafica_locandina_s3e3.png',
    out: 'media/locandina-s3e3',
    width: 500,
    quality: 78,
  },
  {
    src: '01_Podcast_e_Social/03_grafica_locandina_s3e6.png',
    out: 'media/locandina-s3e6',
    width: 500,
    quality: 78,
  },
  {
    src: '01_Podcast_e_Social/09_quiz_s3e3.jpg',
    out: 'media/quiz-s3e3',
    width: 500,
    quality: 78,
  },
  {
    src: '01_Podcast_e_Social/10_quiz_s3e5.jpg',
    out: 'media/quiz-s3e5',
    width: 500,
    quality: 78,
  },

  // --- Sezione 4: Live Experience & Divulgazione Scuole ---
  {
    src: '02_Divulgazione_Scuole_e_Live/01_laboratorio_centro_estivo.jpg',
    out: 'live/laboratorio-estivo',
    width: 1000,
    quality: 80,
  },
  {
    src: '02_Divulgazione_Scuole_e_Live/03_interviste_ocean_film_festival.jpg',
    out: 'live/ocean-film-festival',
    width: 1000,
    quality: 80,
  },
  {
    src: '02_Divulgazione_Scuole_e_Live/04_lezione_scuola_primaria.jpg',
    out: 'live/lezione-primaria',
    width: 1000,
    quality: 80,
  },
  {
    src: '02_Divulgazione_Scuole_e_Live/05_partecipazione_BergeggiMareFest.jpg',
    out: 'live/bergeggi-marefest',
    width: 1000,
    quality: 80,
  },
];

async function run() {
  let done = 0;
  for (const item of MANIFEST) {
    const srcPath = path.join(DATA, item.src);
    const outPath = path.join(OUT, `${item.out}.webp`);
    await mkdir(path.dirname(outPath), { recursive: true });
    try {
      let pipeline = sharp(srcPath).rotate(); // rispetta l'orientamento EXIF delle foto da smartphone
      if (item.crop) pipeline = pipeline.extract(item.crop);
      await pipeline
        .resize({ width: item.width, withoutEnlargement: true })
        .webp({ quality: item.quality })
        .toFile(outPath);
      done += 1;
      console.log(`✓ ${item.src} -> ${item.out}.webp`);
    } catch (err) {
      console.error(`✗ ${item.src}:`, err.message);
    }
  }
  console.log(`\nCompletate ${done}/${MANIFEST.length} conversioni.`);
}

run();
