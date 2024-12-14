import React from "react";

// Importing Components
import Header from "./Header";
import VideoPlayer from "@/components/VideoPlayer";

export function Hero() {
  return (
    <section className="hero" id="hero">
      <Header />
      <VideoPlayer
        //videoSrc="https://res.cloudinary.com/dqrkeb9bz/video/upload/q_auto:best/v1734103518/SHOWREEL_2024_STUDIOHAQUIN_FHD_jxennm.mp4"
        videoSrc="https://live.staticflickr.com/video/54204971545/1d3b0d6e19/1080p.mp4?s=eyJpIjo1NDIwNDk3MTU0NSwiZSI6MTczNDIxODkxNCwicyI6ImY1MTU5YWNhN2UyOTQ0MmEyMjMzY2RhMTA4NGVhNzY0MmY2NGE4Y2EiLCJ2IjoxfQ"
        posterSrc="/showreel-thumbnail.webp"
      />
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