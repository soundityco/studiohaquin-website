// Importing Dependencies //
import React, { useState } from 'react';
import Image from 'next/image';

//import Link from "next/link";
import { Link } from "react-scroll/modules";

// Importing Images
import HeaderMenuShape from '../../content/images/header-menu-shape.svg';
import HeroPicture from '../../content/images/hero-picture.webp';

// Importing Icons
import WebsiteIcon from '../../content/images/website-icon.svg';
import WebIconWhite from '../../content/images/icons/web-icon-white.svg';
import GraphicDesignIconWhite from '../../content/images/icons/graphic-design-icon-white.svg';
import VideoIconWhite from '../../content/images/icons/video-icon-white.svg';


export function Hero() {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
        <div className="hero">

          {/* HERO HEADER */}
          <header>
            <div className="header-container">
              <div className="header-block-left">
                <div className="header-logo-block">
                  <a href="/" className="header-logo">
                    <Image className="header-menu-icon" alt="Header Menu Icon" draggable="false" src={WebsiteIcon}/>
                    <p>Studio Haquin</p>
                  </a>
                </div>
                {/*<Image className="header-menu-shape" alt="Header Menu Shape" draggable="false" src={HeaderMenuShape}/>*/}
              </div>
              {/*<div className="header-block-right">
                <nav className="header-nav">
                  <ul>
                    <li><Link to="home" spy={true} smooth={true} offset={0} duration={300}>👉 M'ENGAGER ?</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="rounded-top-right-shape">
              <div className="circle-black"></div>
            */}
            </div>
          </header>

          {/* HERO CONTENT */}
          <div className="hero-subcontainer">
            <div className="hero-subcontainer-block">
              <div className="hero-intro-container">
                <h1 className="hero-title">Hello,<br/>Bienvenue !</h1>
                <h2 className="hero-subtitle">Je m'appelle Andy, et je suis <span>Designer Graphique</span> et <span>Vidéaste</span> freelance, basé à Angers.</h2>
              </div>
              <nav className="hero-list-container">
                <ul className="hero-list-block">
                  <li className="hero-list-item"><Image className="" alt="Graphic Design Icon" draggable="false" src={GraphicDesignIconWhite}/>Design Graphique</li>
                  <li className="hero-list-item"><Image className="" alt="Web Icon" draggable="false" src={WebIconWhite}/>Web Design</li>
                  <li className="hero-list-item"><Image className="" alt="Video Icon" draggable="false" src={VideoIconWhite}/>Vidéo</li>
                </ul>
              </nav>
            </div>
            <div className="hero-subcontainer-block">
            <Image alt="Hero Picture" draggable="false" src={HeroPicture}/>
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