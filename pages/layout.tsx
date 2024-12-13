import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';


// Importing Custom Fonts & hooks
import Alinsa from 'next/font/local';

// Importing main components
import Loader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyCursor from '../components/stickyCursor';

// Importing Local Fonts
const alinsa = Alinsa({
  variable: '--font-alinsa',
  src: [
    {
      path: '../content/fonts/Alinsa/Alinsa.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../content/fonts/Alinsa/Alinsa.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../content/fonts/Alinsa/Alinsa.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* SCROLL DETECTION */
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null); 
  const headerRef = useRef<HTMLElement | null>(null);  // Change 'HTMLAnchorElement' to 'HTMLElement'

  const changeClass = () => {
    if (containerRef.current) {
      const scrollValue = containerRef.current.scrollTop;
      if (scrollValue > 800) {
        setScrolled(true);
        if (headerRef.current) {
          headerRef.current.classList.add('header-scrolled');  // Add class on scroll
        }
      } else {
        setScrolled(false);
        if (headerRef.current) {
          headerRef.current.classList.remove('header-scrolled');  // Remove class when no scroll
        }
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

  const stickyElement = useRef(null);

  return (
    <>
      {/* LOADER & OVERLAYS */}
      {/*<div className="overlay-noise"></div>*/}
      <Loader />
      <StickyCursor stickyElement={stickyElement}/>

      {/* SITE CONTENT */}
      <div className={clsx(scrolled ? "main-scrolled" : "main", alinsa.variable)}>
      {/*<div className="main">*/}
        <div className={scrolled ? "main-container-scrolled" : "main-container"}>
        {/*<div className="main-container">*/}

          {/* PAGE */}
          <div className="site-content" ref={containerRef}>
            {/* HEADER */}
            {/*<Header ref={headerRef} />*/}
            {children}
            {/* FOOTER */}
            <Footer/>
          </div>

        </div>
      </div>
    </>
  );
}
