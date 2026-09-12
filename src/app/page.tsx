import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Problem from '@/components/landing/Problem';
import Features from '@/components/landing/Features';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white antialiased selection:bg-orange-500 selection:text-black">
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <Footer />
    </main>
  );
}
