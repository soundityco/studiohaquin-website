// Importing Dependencies
import React, { useState } from 'react';
import Image from 'next/image';

// TYPE WRITER EFFECT
import Typewriter from 'typewriter-effect';

//import Link from "next/link";
import { Link } from "react-scroll/modules";

// Importing Images
import HeaderMenuShape from '../../content/images/header-menu-shape.svg';
import HeroPicture from '../../content/images/hero-picture.webp';

// Importing Icons
import WebIconWhite from '../../content/images/icons/web-icon-white.svg';
import GraphicDesignIconWhite from '../../content/images/icons/graphic-design-icon-white.svg';
import VideoIconWhite from '../../content/images/icons/video-icon-white.svg';


export function Hero() {

  return (
    <>
        {/* HERO CONTENT */}
        <div className="hero">
          <div className="hero-container container">
            <div className="hero-subcontainer-block">
              <div className="hero-intro-container">
                <h1 className="hero-title">
                  Besoin d'un
                  <br/>
                  <Typewriter
                      options={{
                        strings: ['designer graphique ?', 'vidéaste ?', 'cadreur vidéo ?', 'monteur vidéo ?', ],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </h1>
                <h2 className="hero-subtitle">Hello ! Je m'appelle Andy et je suis <span>Designer Graphique</span> & <span>Vidéaste</span> freelance, basé à Angers.</h2>
              </div>
              <nav className="hero-list-container">
                <ul className="hero-list-block">
                  <li className="hero-list-item"><Image className="hero-list-item-icon" alt="Web Icon" draggable="false" src={WebIconWhite}/>Web Design</li>
                  <li className="hero-list-item"><Image className="hero-list-item-icon" alt="Graphic Design Icon" draggable="false" src={GraphicDesignIconWhite}/>Design Graphique</li>
                  <li className="hero-list-item"><Image className="hero-list-item-icon" alt="Video Icon" draggable="false" src={VideoIconWhite}/>Vidéo</li>
                </ul>
              </nav>
            </div>
            <div className="hero-subcontainer-block">
              <Image className="hero-picture" alt="Hero Picture" draggable="false" src={HeroPicture}/>
              {/*<div className="hero-picture">
                <div>
                  <Image alt="Hero Picture" draggable="false" src={HeroPicture}/>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
    </>
  );
}

export default Hero;