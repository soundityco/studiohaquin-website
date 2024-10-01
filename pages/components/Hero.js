// Importing Dependencies //
import React, { useState } from 'react';
import Image from 'next/image';

//import Link from "next/link";
import { Link } from "react-scroll/modules";

// Importing Images
import HeaderMenuShape from '../../content/images/header-menu-shape.svg';
import WebsiteIcon from '../../content/images/website-icon.svg';
import HeroPicture from '../../content/images/hero-picture.webp';

export function Hero() {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="hero-container">
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
                <Image className="header-menu-shape" alt="Header Menu Shape" draggable="false" src={HeaderMenuShape}/>
              </div>
              <div className="header-block-right">
                <nav className="header-nav">
                  <ul>
                    <li><Link to="home" spy={true} smooth={true} offset={0} duration={300}>Bonjour</Link></li>
                    <li><Link to="home" spy={true} smooth={true} offset={0} duration={300}>Réalisations</Link></li>
                    <li><Link to="home" spy={true} smooth={true} offset={0} duration={300}>À propos</Link></li>
                    <li><Link to="home" spy={true} smooth={true} offset={0} duration={300}>Contact</Link></li>
                  </ul>
                </nav>

              </div>
            </div>
            <div className="rounded-top-right-shape">
              <div className="circle-black"></div>
            </div>
          </header>

          {/* HERO CONTENT */}
          <div className="hero-subcontainer">
            <div className="hero-subcontainer-block">
              <h1 className="hero-title">Hello,<br/>Bienvenue !</h1>
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
      </div>
    </>
  );
}

export default Hero;