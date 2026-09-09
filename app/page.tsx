import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ScriptingSection from '@/components/ScriptingSection';
import MediaSection from '@/components/MediaSection';
import LiveSection from '@/components/LiveSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ScriptingSection />
        <MediaSection />
        <LiveSection />
      </main>
      <Footer />
    </>
  );
}
