import React, { useEffect, useRef } from 'react';

// Import components
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Import utils components
import CustomCursor from '@/components/utils/CustomCursor'; // Import du composant externe
import SoundManager from '@/components/utils/SoundManager'; // Import du composant externe

import { ReactLenis, useLenis } from '@/components/utils/lenis';
import 'lenis/dist/lenis.css';

import { Bricolage_Grotesque, Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const stickyElement = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    // Désactiver la mémoire du scroll dans le navigateur
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  const handleLoaderComplete = () => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true }); // Reset après le Loader
    }
  };

  return (
    <ReactLenis root>
      <div className={`${inter.className}`}> {/* ${bricolage.className} */}
        {/* Ajouter SoundManager ici */}
        <SoundManager />
        <Loader lenis={lenis} onLoaderComplete={handleLoaderComplete} />
        <div ref={stickyElement}>
          <CustomCursor stickyElement={stickyElement} />
        </div>
        <Header />
        {children}
        <Footer />
      </div>
    </ReactLenis>
  );
}
