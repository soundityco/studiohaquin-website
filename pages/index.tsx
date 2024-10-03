import React, { useState, useEffect, useRef } from 'react';
import Head from "next/head";

// Importing main components
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// Importing components
import GraphicDesign from "./components/GraphicDesign";

export function Home() {
  const [scrolled, setScrolled] = useState(false);

  // Typage explicite pour le conteneur référencé (HTMLDivElement)
  const containerRef = useRef<HTMLDivElement | null>(null); 

  const changeClass = () => {
    // Vérification si containerRef existe avant d'accéder à scrollTop
    if (containerRef.current) {
      const scrollValue = containerRef.current.scrollTop;
      console.log('Scroll position:', scrollValue);

      if (scrollValue > 0) {
        setScrolled(true);
        console.log('Class added: main-scrolled');
      } else {
        setScrolled(false);
        console.log('Class removed: main');
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Le code est maintenant exécuté côté client
      const container = containerRef.current;
      if (!container) return;

      // Ajout de l'événement de défilement sur `main-container-block`
      container.addEventListener('scroll', changeClass);

      // Nettoyage de l'écouteur lors du démontage
      return () => {
        if (container) {
          container.removeEventListener('scroll', changeClass);
        }
      };
    }
  }, []);

  return (
    <>
      {/* LOADER */}
      <Loader />

      <div className={scrolled ? "main-scrolled" : "main"}>
        <div className={scrolled ? "main-container-scrolled" : "main-container"}>
          {/* main-container-block devient scrollable */}
          <div className="main-container-block" ref={containerRef} style={{ overflowY: 'auto', height: '100vh' }}>
            <Head>
              <title>Studio Haquin / Andy Haquin-Guyard — Designer Graphique & Vidéaste, cadreur, monteur basé à Angers</title>
              <meta name="description" content="De la prise de vue au montage, en passant par la conception graphique, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante. ✨" />
              <link rel="icon" href="/favicon.ico" />
              <meta name="facebook-domain-verification" content="" />
            </Head>

            {/* HEADER */}
            <Hero />

            {/* COMPONENTS */}
            <GraphicDesign />

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;