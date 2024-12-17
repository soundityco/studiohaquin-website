import React, { useRef } from 'react';
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import StickyCursor from '@/components/stickyCursor';

// Google Font
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Smooth Scroll
import { ReactLenis } from '@/components/utils/lenis';
import 'lenis/dist/lenis.css';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stickyElement = useRef(null);

  return (
    <ReactLenis root>
      <div className={inter.className}>
        <Loader />
        <div ref={stickyElement}> {/* Ajout de ref ici */}
          <StickyCursor stickyElement={stickyElement} />
        </div>
        {children}
        <Footer />
      </div>
    </ReactLenis>
  );
}






{/*import React, { useState, useEffect, useRef } from 'react';

// Importing main components
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import StickyCursor from '../components/stickyCursor';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const stickyElement = useRef(null);

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  return (
    <>
      <Loader />
      <StickyCursor stickyElement={stickyElement}/>
      {children}
      <Footer/>
    </>
  );
}*/}