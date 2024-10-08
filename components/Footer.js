// Importing Dependencies //
import React from "react";
import Image from 'next/image';

// Importing Icons
import { WebsiteIcon } from "@/components/Images";

export function Footer() {

  return (
    <>

      {/* FOOTER PART */}
      <footer>
        <div className="footer-container container">
          <div className="footer-container-block">
            <h1 className="section-title footer-title">Enchanté,<br/>Parlez moi de votre projet !</h1>
            <a className="button button-footer" href="mailto:andy@studiohaquin.com">👉 Contactez-moi !</a>
          </div>
          <div className="footer-container-block">
            <nav className="footer-links">
              <ul>
                <li><a className="footer-link" href="https://linkedin.com/in/andyblurblur" target="_blank">LinkedIn</a></li>
                <li><a className="footer-link" href="https://instagram.com/studiohaquin" target="_blank">Instagram</a></li>
                <li><a className="footer-link" href="https://be.net/studiohaquin" target="_blank">Behance</a></li>
                {/*<li><a className="footer-link" href="mailto:andy@studiohaquin.com" target="_blank">andy@studiohaquin.com</a></li>*/}
              </ul>
            </nav>

          </div>
          <div className="footer-container-block">
            <a className="footer-cc" href="/">
              {/*<WebsiteIcon className="footer-icon" alt="Website Logo" draggable="false"/>*/}
              Studio Haquin © 2024
            </a>
            <p className="footer-cc" >Designed & dev by&nbsp;<span><a class="button-footer-reveal">Studio Haquin</a></span></p>
          </div>
        </div>
      </footer>
    
    </>
  );
}

export default Footer;
