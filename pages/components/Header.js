// Importing Dependencies //
import React from "react";
import Image from 'next/image';

// Importing Icons
import WebsiteIcon from '../../content/images/website-icon.svg';

export function Header() {

  return (
    <>
      {/* HEADER PART */}
      <header>
        <div className="header-container container">
            <div className="header-logo-block">
                <a href="/" className="header-logo">
                <Image className="header-menu-icon" alt="Header Menu Icon" draggable="false" src={WebsiteIcon}/>
                <p>Studio Haquin</p>
                </a>
            </div>
            {/*<Image className="header-menu-shape" alt="Header Menu Shape" draggable="false" src={HeaderMenuShape}/>*/}
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
    
    </>
  );
}

export default Header;
