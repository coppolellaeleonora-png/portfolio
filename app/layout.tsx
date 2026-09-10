import type { Metadata } from 'next';
import { Bodoni_Moda, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/content';
import AuroraBackground from '@/components/AuroraBackground';
import ScrollProgress from '@/components/ScrollProgress';

// Serif display ad alto contrasto, editoriale — molto più "professionale"
// del Fraunces usato in origine (che in corsivo leggeva come infantile).
const displayFont = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | ${site.role}`,
  description: site.description,
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: site.ogImage, width: 1200, height: 1200 }],
    locale: 'it_IT',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: [site.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${displayFont.variable} ${jakarta.variable} ${mono.variable}`}>
      <body className="bg-abyss-950 font-sans text-ink antialiased">
        <AuroraBackground />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
