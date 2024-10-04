// Importing Dependencies //
import React from "react";
import Image from 'next/image';

// Importing Icons
import { WebsiteIcon } from "./Images";

export function Header() {

  return (
    <>
      {/* HEADER PART */}
      <header>
        <div className="header-container container">
            <a href="/" className="header-logo">
              <WebsiteIcon className="header-menu-icon" alt="Header Menu Icon" draggable="false"/>
              <p>Studio Haquin</p>
            </a>
            <nav className="header-nav">
                <ul>
                  <li><a href="mailto:andy@studiohaquin.com">👉 Me contacter</a></li>
                </ul>
            </nav>
          </div>
    </header>
    
    </>
  );
}

export default Header;
