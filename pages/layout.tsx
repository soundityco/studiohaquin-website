import React, { useEffect, useRef } from 'react';
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import StickyCursor from '@/components/stickyCursor';
import SoundManager from '@/components/utils/SoundManager'; // Import du composant externe
import 'lenis/dist/lenis.css';

import { ReactLenis, useLenis } from '@/components/utils/lenis';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

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
      <div className={inter.className}>
        {/* Ajouter SoundManager ici */}
        <SoundManager />
        <Loader lenis={lenis} onLoaderComplete={handleLoaderComplete} />
        <div ref={stickyElement}>
          <StickyCursor stickyElement={stickyElement} />
        </div>
        {children}
        <Footer />
      </div>
    </ReactLenis>
  );
}
