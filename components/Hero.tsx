// Importing Dependencies
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// TYPE WRITER EFFECT
import Typewriter from 'typewriter-effect';

//import Link from "next/link";

// Importing Images
import HeroPicture from '@/content/images/hero-picture.webp';

// Importing Icons
import { WebDesignIcon, GraphicDesignIcon, ContactIcon, VideoIcon } from "@/components/Images";

export function Hero() {

  return (
    <section className="hero" id="hero">
      <div className="hero-container container">
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
                  {/*<span className="section-title-special-2">Design</span>*/}&nbsp;web<span className="hero-title-special">&nbsp;<span className="hero-title-special-4">&</span>&nbsp;</span><span className="hero-title-special-3">vidéo</span>
                  </div>
                </div>
              </h1>
              <Image className="hero-picture" alt="Hero Picture" draggable="false" src={HeroPicture}/>
            {/*<h2 className="section-subtitle">Hello ! Je m'appelle Andy et je suis <span>Designer Graphique</span> & <span>Vidéaste</span> freelance, basé à Angers.</h2>*/}
          </div>
        </div>
        {/*<div className="hero-subcontainer-block">
          <Image className="hero-picture" alt="Hero Picture" draggable="false" src={HeroPicture}/>
        </div>*/}
      </div>
    </section>
  );
}

export default Hero;