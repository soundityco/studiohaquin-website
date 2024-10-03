import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

// Importing Custom Fonts
import Alinsa from 'next/font/local'

// Importing Smooth Scroll
import SmoothScrolling from "@/pages/components/SmoothScrolling";

// Importing main components
import Loader from "./components/Loader";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Importing Local Fonts
const alinsa = Alinsa({
  variable: '--font-alinsa',
  src: [
    {
      path: '../content/fonts/alinsa.woff2',  // Ajouter .woff2
      weight: '300',
      style: 'normal',
    },
    {
      path: '../content/fonts/alinsa.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../content/fonts/alinsa.ttf',  // Ajouter .ttf si nécessaire
      weight: '300',
      style: 'normal',
    },
  ]
});

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {

  /* SCROLL DETECTION */
  const [scrolled, setScrolled] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null); 

  const changeClass = () => {

    if (containerRef.current) {
      const scrollValue = containerRef.current.scrollTop;

      if (scrollValue > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const container = containerRef.current;
      if (!container) return;

      container.addEventListener('scroll', changeClass);

      return () => {
        if (container) {
          container.removeEventListener('scroll', changeClass);
        }
      };
    }
  }, []);

    return (
      <>
        {/* LOADER & OVERLAYS */}
        <div className="overlay"></div>
        <div className="overlay-noise"></div>
        <Loader />

        {/* SITE CONTENT */}
        <div className={clsx(scrolled ? "main-scrolled" : "main", alinsa.variable)}>
          <div className={scrolled ? "main-container-scrolled" : "main-container"}>

            {/* PAGE */}
            <div className="site-content" ref={containerRef}>
              {/* HEADER */}
              <Header/>
              {/*<SmoothScrolling>{children}</SmoothScrolling>*/}
              {children}
              {/* FOOTER */}
              <Footer/>
            </div>

          </div>
        </div>
      </>
    );
  };