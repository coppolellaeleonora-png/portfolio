// Antepone il basePath configurato in next.config.js ai percorsi statici
// serviti da /public. Necessario perché con output:'export' i tag <img>
// nativi (usati al posto di next/image, che richiede unoptimized) non
// ricevono automaticamente il basePath come invece fa next/link.
export function withBasePath(assetPath: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  if (assetPath.startsWith('http')) return assetPath;
  return `${basePath}${assetPath}`;
}
