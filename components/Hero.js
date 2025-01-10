import React, { useState, useEffect } from "react";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';


import { StudioHaquinLogo, ArrowDownIcon } from "@/components/Images";

// Importing Components
import Header from "./Header";
import VideoPlayer from "@/components/utils/VideoPlayer";

export function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1250px)");
    
    // Fonction pour mettre à jour l'état en fonction de la largeur
    const handleMediaChange = (e) => setIsDesktop(e.matches);

    // Initialisation de l'état
    setIsDesktop(mediaQuery.matches);

    // Ajouter un écouteur
    mediaQuery.addEventListener("change", handleMediaChange);

    // Nettoyer l'écouteur à la fin
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-container container">
        
        {/* Rendre conditionnellement le header */}
        {isDesktop ? (
          <div className="header-parent">
            <Header />
          </div>
        ) : (
          <Header />
        )}
        <div className="hero-video-container">
          <video className="hero-video"
            playsInline
            preload="auto"
            //poster="/showreel-thumbnail.webp"
            autoPlay
            muted
            loop
          >
            <source src="https://res.cloudinary.com/dqrkeb9bz/video/upload/q_auto/v1736499832/SHOWREEL_2024_STUDIOHAQUIN_FHD5_be4yfu.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-container-shadow">

          </div>
        </div>

        {/*<VideoPlayer className="container"
          videoSrc="https://res.cloudinary.com/dqrkeb9bz/video/upload/q_auto:best/v1736336766/SHOWREEL_2024_STUDIOHAQUIN_FHD4_h0klpd.mp4"
          //videoSrc="https://live.staticflickr.com/video/54204971545/1d3b0d6e19/1080p.mp4?s=eyJpIjo1NDIwNDk3MTU0NSwiZSI6MTczNDIxODkxNCwicyI6ImY1MTU5YWNhN2UyOTQ0MmEyMjMzY2RhMTA4NGVhNzY0MmY2NGE4Y2EiLCJ2IjoxfQ"
          posterSrc="/showreel-thumbnail.webp"
        />*/}
        <div className="hero-title-block">
          {/*<div className="scroll-button"></div>*/}
          {/*<Link to="portfolio" smooth={true} duration={500} className="hero-scroll">
            SCROLL&nbsp;<ArrowDownIcon />
          </Link>*/}
          <StudioHaquinLogo className="hero-title-block-logo" alt="Studio Haquin Logo" draggable="false"/>
          {/*<h1 className="hero-title">STUDIO HAQUIN ©</h1>*/}
        </div>
      </div>
    </section>
  );
}

export default Hero;




      {/*<div className="hero-container container">
        <div className="hero-subcontainer-block">
          <div className="hero-intro-container">
              <h1 className="hero-title">
                <div className="hero-title-line">
                  <div className="hero-title-line-content hero-title-line-content-1">
                    <span>studio</span>&nbsp;Haquin&nbsp;<span className="hero-title-special">©</span>
                  </div>
                </div>
                <div className="hero-title-line">
                  <div className="hero-title-line-content hero-title-line-content-2">
                    Design&nbsp;<span className="hero-title-special-2">Graphique,</span>
                  </div>
                </div>
                <div className="hero-title-line">
                  <div className="hero-title-line-content hero-title-line-content-3">
                  &nbsp;web<span className="hero-title-special">&nbsp;<span className="hero-title-special-4">&</span>&nbsp;</span><span className="hero-title-special-3">vidéo</span>
                  </div>
                </div>
              </h1>
              <Image className="hero-picture" alt="Hero Picture" draggable="false" src={HeroPicture}/>
          </div>
        </div>
      </div>*/}