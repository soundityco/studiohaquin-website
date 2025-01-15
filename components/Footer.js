// Importing Dependencies //
import React from "react";

import { MailStudioHaquinLogo } from "./Images";

export function Footer() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer> {/* FOOTER PART */}
      <div className="footer-container container">
        <a className="footer-logo show-me" href="mailto:hello@studiohaquin.com?subject=J'ai un super projet à vous proposer ! 😎&body=Hello Andy ! (très beau prénom), J'ai pour projet de…"><MailStudioHaquinLogo className="footer-logo" alt="Studio Haquin Logo" draggable="false"/></a>
        <h1 className="section-title footer-title">Parlez-moi de votre projet !</h1>
        <div className="footer-container-block">
          <nav className="footer-links">
            <ul>
              <li><a className="footer-link show-me hover-sound-instagram" href="https://instagram.com/studiohaquin" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a className="footer-link show-me hover-sound-linkedin" href="https://linkedin.com/in/andyhaquin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="footer-link show-me hover-sound-behance" href="https://be.net/studiohaquin" target="_blank" rel="noopener noreferrer">Behance</a></li>
            </ul>
          </nav>
          <a className="button-contact hover-sound-contact" href="mailto:hello@studiohaquin.com?subject=J'ai un super projet à vous proposer ! 😎&body=Hello Andy ! (très beau prénom), J'ai pour projet de…">Me contacter</a>{/* 👉 */}
        </div>
        <div className="footer-container-block">
          <p className="footer-cc">
            Studio Haquin © {currentYear}
          </p>
          <p className="footer-cc">
            Designed & dev by&nbsp;<span><a className="button-footer-reveal hover-sound-mario" href="#">Studio Haquin</a></span>
          </p>
        </div>
        
      </div>
      {/*
      <div className="footer-container container">
        <div className="footer-container-block">
          <h1 className="section-title footer-title">Parlez-moi de votre projet !</h1>
          <a className="button-contact hover-sound-contact" href="mailto:andy@studiohaquin.com?subject=J'ai un super projet à vous proposer ! 😎&body=Hello Andy ! (très beau prénom), J'ai pour projet de…">Me contacter</a>
        </div>
        <div className="footer-container-block">
          <nav className="footer-links">
            <ul>
              <li><a className="footer-link show-me hover-sound-instagram" href="https://instagram.com/studiohaquin" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a className="footer-link show-me hover-sound-linkedin" href="https://linkedin.com/in/andyhaquin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="footer-link show-me hover-sound-behance" href="https://be.net/studiohaquin" target="_blank" rel="noopener noreferrer">Behance</a></li>
            </ul>
          </nav>
        </div>
        <div className="footer-container-block">
          <p className="footer-cc">
            Studio Haquin © {currentYear}
          </p>
          <p className="footer-cc">
            Designed & dev by&nbsp;<span><a className="button-footer-reveal hover-sound-mario" href="#">Studio Haquin</a></span>
          </p>
        </div>
        <MailStudioHaquinLogo className="footer-logo" alt="Studio Haquin Logo" draggable="false"/>
      </div> */}
    </footer>
  );
}

export default Footer;

