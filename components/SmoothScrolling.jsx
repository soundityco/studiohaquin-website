"use client";

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

function SmoothScrolling({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup on component unmount
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScrolling;