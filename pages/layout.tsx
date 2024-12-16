import React, { useEffect, useRef } from 'react';
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import StickyCursor from '@/components/stickyCursor';

import 'lenis/dist/lenis.css'

import { ReactLenis } from '@/components/utils/lenis';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const stickyElement = useRef(null);

  return (
    <ReactLenis root>
      <Loader />
      <StickyCursor stickyElement={stickyElement}/>
      {children}
      <Footer />
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