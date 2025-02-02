import React, { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";

import { MailStudioHaquinLogo, NewLinkIcon } from "@/components/Images";

const Header = forwardRef<HTMLElement>((props, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleInternalLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      ref={ref}
      className={`header ${isMenuOpen ? "menu-open" : ""} ${hasScrolled ? "scrolled" : ""} ${isMenuOpen && hasScrolled ? "scrolled-no-blur" : ""}`}
      animate={{
        height: isMenuOpen ? "100vh" : "auto",
        position: "fixed",
        backgroundColor: isMenuOpen ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="header-container-master">
      <div className="header-container container">
        <div className="header-container-block">
          <a className="button-contact link" href="/">
            STUDIO HAQUIN ©
          </a>
          <div className="header-button link">
            <a className="button-contact hover-sound-contact" onClick={toggleMenu}>
              {isMenuOpen ? "FERMER" : "MENU"}
            </a>
            <a
              className="button-contact-img link"
              href="mailto:hello@studiohaquin.com?subject=J'ai un super projet à vous proposer ! 😎&body=Hello Andy ! (très beau prénom), J'ai pour projet de…"
              target="_blank"
              rel="noopener noreferrer"
            >
              <NewLinkIcon />
            </a>
          </div>
        </div>
        <AnimatePresence>
        {isMenuOpen && (
          <motion.div
          className="header-menu-content"
          initial="hidden"
          animate="visible"
          exit="exit" // On crée une animation spécifique pour l'exit
          variants={{
            hidden: { opacity: 0, y: -100 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.2, // Delay uniquement à l'entrée
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
            exit: { opacity: 0, y: -100, transition: { duration: 0.3, ease: "easeInOut" } }, // Exit rapide, sans delay
          }}
        >
            <nav>
              <ul>
                <li>
                  <Link to="portfolio" smooth={true} duration={200} onClick={handleInternalLinkClick}>
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="intro" smooth={true} duration={400} onClick={handleInternalLinkClick}>
                    À PROPOS
                  </Link>
                </li>
                <li>
                  <Link to="footer" smooth={true} duration={600} onClick={handleInternalLinkClick}>
                    Contact
                  </Link>
                </li>

                {/*<li>
                  <a href="mailto:hello@studiohaquin.com?subject=J'ai un super projet à vous proposer ! 😎&body=Hello Andy ! (très beau prénom), J'ai pour projet de…">
                    HELLO@STUDIOHAQUIN.COM
                  </a>
                </li>*/}

                <li>
                  <a href="https://www.instagram.com/studiohaquin" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/andyhaquin" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      
      </div>
    </motion.header>
  );
});

export default Header;