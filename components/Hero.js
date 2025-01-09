import React from "react";

import { StudioHaquinLogo } from "@/components/Images";

// Importing Components
import Header from "./Header";
import VideoPlayer from "@/components/utils/VideoPlayer";

export function Hero() {
  return (
    <section className="hero" id="hero">
      <Header/>
      <div className="hero-video-container">
        <video className="hero-video"
          playsInline
          preload="auto"
          //poster="/showreel-thumbnail.webp"
          autoPlay
          muted
          loop
        >
          <source src="https://res.cloudinary.com/dqrkeb9bz/video/upload/q_auto/v1736446317/SHOWREEL_2024_STUDIOHAQUIN_FHD5_cq29ku.mp4" type="video/mp4" />
        </video>
      </div>

      {/*<VideoPlayer className="container"
        videoSrc="https://res.cloudinary.com/dqrkeb9bz/video/upload/q_auto:best/v1736336766/SHOWREEL_2024_STUDIOHAQUIN_FHD4_h0klpd.mp4"
        //videoSrc="https://live.staticflickr.com/video/54204971545/1d3b0d6e19/1080p.mp4?s=eyJpIjo1NDIwNDk3MTU0NSwiZSI6MTczNDIxODkxNCwicyI6ImY1MTU5YWNhN2UyOTQ0MmEyMjMzY2RhMTA4NGVhNzY0MmY2NGE4Y2EiLCJ2IjoxfQ"
        posterSrc="/showreel-thumbnail.webp"
      />*/}
      <div className="hero-title-block">
        <StudioHaquinLogo className="hero-title-block-logo" alt="Studio Haquin Logo" draggable="false"/>
        {/*<h1 className="hero-title">STUDIO HAQUIN ©</h1>*/}
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