import React, { useState, useEffect } from "react";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import Image from "next/image";


import { StudioHaquinLogo, ArrowDownIcon, ArrowRightIcon, OneVoiceAnimalLogo, TeamForThePlanetLogo } from "@/components/Images";

// Importing Components
import Header from "./Header";
import VideoPlayer from "@/components/utils/VideoPlayer";

export function Hero() {
  /*const [isDesktop, setIsDesktop] = useState(false);

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
  }, []);*/

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <Header />
        {/* Rendre conditionnellement le header */}
        {/*{isDesktop ? (
          <div className="header-parent">
            <Header />
          </div>
        ) : (
          <Header />
        )}*/}
        <div className="hero-video-container">
          <video className="hero-video"
            playsInline
            preload="auto"
            //poster="/showreel-thumbnail.webp"
            autoPlay
            muted
            loop
          >
            <source src="https://res.cloudinary.com/dqrkeb9bz/video/upload/q_auto/v1738350956/SHOWREEL_2024_STUDIOHAQUIN_FHD6_pnvgrb.mp4" type="video/mp4" />
          </video>

          {/*<VideoPlayer className="container"
            videoSrc="https://res.cloudinary.com/dqrkeb9bz/video/upload/q_auto/v1736499832/SHOWREEL_2024_STUDIOHAQUIN_FHD5_be4yfu.mp4"
            //posterSrc="/showreel-thumbnail.webp"
          />*/}

          <div className="hero-video-container-shadow"></div>
        </div>
       {/* <div className="hero-title-block">
          <div className="scroll-button"></div>
          
          {/*<Link to="portfolio" smooth={true} duration={500} className="hero-scroll">
            SCROLL&nbsp;<ArrowDownIcon />
          </Link>*/}
          
          <div className="hero-text-block">
            <h1>[STUDIO HAQUIN ©]</h1>
            <p>Studio de création graphique et audiovisuelle, basé à Angers, FR.</p>
          </div>

          {/*<StudioHaquinLogo className="hero-title-block-logo" alt="Studio Haquin Logo" draggable="false"/>*/}
          
          {/*<div className="hero-engaged-roll-block">
            <a href="https://one-voice.fr/faire-un-don/donner-en-tant-que-particulier/#form" target="_blank"
              className="hero-engaged-roll hero-engaged-roll-onevoice show-me">
            </a>
            <a href="https://team-planet.com/fr/invites/uIteWnJAtr4" target="_blank"
              className="hero-engaged-roll hero-engaged-roll-teamfortheplanet show-me">
            </a>
          </div>
        </div>*/}
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