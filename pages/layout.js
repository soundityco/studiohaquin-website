import React, { useEffect, useRef } from 'react';
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import StickyCursor from '@/components/stickyCursor';

export default function Layout({ children }) {

  const stickyElement = useRef(null);
  const scrollContainerRef = useRef(null); // Create a ref for the scroll container

  useEffect(() => {
    let locomotiveScroll;
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      locomotiveScroll = new LocomotiveScroll({
        el: scrollContainerRef.current, // Use the ref for the scroll container
        smooth: true, // Enable smooth scrolling
        smoothMobile: true, // Enable smooth scrolling on mobile
        getDirection: true, // Detect scroll direction
      });

    })();

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy(); // Cleanup
      }
    };
  }, []);


  return (
    <div data-scroll-container ref={scrollContainerRef}> {/* Set the data-scroll-container here */}
      <Loader />
      <StickyCursor stickyElement={stickyElement} />
      {children}
      <Footer />
    </div>

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