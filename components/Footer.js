// Importing Dependencies //
import React from "react";

export function Footer() {

  return (
      <footer> {/* FOOTER PART */}
        <div className="footer-container container">
          <div className="footer-container-block">
            <h1 className="section-title footer-title">Parlez moi de votre projet !</h1>
            <a className="button button-contact" href="mailto:andy@studiohaquin.com">👉 Me contacter</a>
          </div>
          <div className="footer-container-block">
            <nav className="footer-links">
              <ul>
                <li><a className="footer-link show-me" href="https://linkedin.com/in/andyhaquin" target="_blank">LinkedIn</a></li>
                <li><a className="footer-link show-me" href="https://instagram.com/studiohaquin" target="_blank">Instagram</a></li>
                <li><a className="footer-link show-me" href="https://be.net/studiohaquin" target="_blank">Behance</a></li>
              </ul>
            </nav>
          </div>
          <div className="footer-container-block">
            <p className="footer-cc">
              Studio Haquin © 2024
            </p>
            <p className="footer-cc">Designed & dev by&nbsp;<span><a class="button-footer-reveal">Studio Haquin</a></span></p>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
