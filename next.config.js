/** @type {import('next').NextConfig} */

// Nome del repository GitHub: determina il sotto-path su cui viene servito
// il sito con GitHub Pages (https://<username>.github.io/<REPO_NAME>/).
// Cambia SOLO questa costante se in futuro rinomini il repository.
const REPO_NAME = 'portfolio';

// In sviluppo locale (next dev) niente basePath, così l'app resta su "/".
// In build di produzione (next build / export) applichiamo il sotto-path.
const isProd = process.env.NODE_ENV === 'production';

const basePath = isProd ? `/${REPO_NAME}` : '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: isProd ? `/${REPO_NAME}/` : '',
  env: {
    // Esposta al client per costruire manualmente i percorsi di asset
    // statici (immagini in /public) coerenti col basePath in produzione.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // next/image richiede unoptimized:true in static export: niente
    // ottimizzazione server-side possibile su GitHub Pages.
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
