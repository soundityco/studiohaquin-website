// Importing Dependencies
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// TYPE WRITER EFFECT
import Typewriter from 'typewriter-effect';

//import Link from "next/link";

// Importing Images
import HeroPicture from '@/content/images/hero-picture.webp';

// Importing Icons
import { WebDesignIcon } from "@/components/Images";
import { GraphicDesignIcon } from "@/components/Images";
import { VideoIcon } from "@/components/Images";


export function Hero() {

  return (
    <section className="hero">
      <div className="hero-container container">
        <div className="hero-subcontainer-block">
          <div className="hero-intro-container">
            <h1 className="section-title hero-title">
              Besoin d'un
              <br/>
              <Typewriter
                options={{
                  //strings: ['designer graphique ?', 'designer web ?', 'vidéaste ?', 'cadreur vidéo ?', 'monteur vidéo ?', ],
                  strings: ['designer ?', 'vidéaste ?', 'cadreur ?', 'monteur ?', ],
                  autoStart: true,
                  loop: true,
                  
                }}
              />
              </h1>
            <h2 className="section-subtitle">Hello ! Je m'appelle Andy et je suis <span>Designer Graphique</span> & <span>Vidéaste</span> freelance, basé à Angers.</h2>
          </div>
          <nav className="hero-list-container">
            <ul className="hero-list-block">
              <li>
                <span className="button">
                  <WebDesignIcon className="button-icon" alt="Web Icon" draggable="false"/>
                  Web Design
                </span>
              </li>
              <li>
                <span className="button">
                  <GraphicDesignIcon className="button-icon" alt="Graphic Design Icon" draggable="false"/>
                  Design Graphique
                </span>
              </li>
              <li>
                <span className="button">
                  <VideoIcon className="button-icon" alt="Video Icon" draggable="false"/>
                  Vidéo
                </span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hero-subcontainer-block">
          <Image className="hero-picture" alt="Hero Picture" draggable="false" src={HeroPicture}/>
        </div>
      </div>
    </section>
  );
}

export default Hero;