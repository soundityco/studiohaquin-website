import React, { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Link } from "react-scroll";

import { MailStudioHaquinLogo, NewLinkIcon, WebsiteIcon } from "@/components/Images";

const Header = forwardRef<HTMLElement>((props, ref) => {

  const [displayText, setDisplayText] = useState<string>("Studio Haquin ©"); // Texte affiché
  const [isGreeting, setIsGreeting] = useState<boolean>(false); // Détermine si on affiche le greeting ou "Studio Haquin"
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);


  useEffect(() => {
    const updateText = () => {
      if (isGreeting) {
        setDisplayText("Studio Haquin");
        setTimeout(() => setIsGreeting(false), 15000); // Revenir à Studio Haquin pour 15 secondes
      } else {
        const currentHour = new Date().getHours();
        if (currentHour >= 0 && currentHour < 6) {
          setDisplayText("Il est un peu tard, non ? 🧐");
        } else if (currentHour >= 6 && currentHour < 12) {
          setDisplayText("Bonne journée ! 😇");
        } else if (currentHour >= 12 && currentHour < 14) {
          setDisplayText("Miam, bon appétit ! 🍕");
        } else if (currentHour >= 14 && currentHour < 18) {
          setDisplayText("Une petite sieste ? 😌");
        } else {
          setDisplayText("Je vais pas tarder… 😴");
        }
        setTimeout(() => setIsGreeting(true), 5000); // Afficher le greeting pour 5 secondes
      }
    };

    updateText(); // Initialiser le cycle dès le chargement

    // Met à jour le texte en boucle
    const interval = setInterval(updateText, 20000); // 20s = 5s (greeting) + 15s (Studio Haquin)

    return () => clearInterval(interval); // Nettoyage
  }, [isGreeting]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsAnimating(true); // Active le z-index immédiatement à l’ouverture
    }
    setIsMenuOpen((prev) => !prev);
  };

  const handleInternalLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      ref={ref}
      className={`header ${isMenuOpen ? "menu-open" : ""}
                        ${hasScrolled ? "scrolled" : ""}
                        ${isMenuOpen && hasScrolled ? "scrolled-no-blur" : ""}`}
      animate={{
        height: isMenuOpen ? "100vh" : "auto",
        position: "fixed",
        backgroundColor: isMenuOpen ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)",
      }}
      style={{ zIndex: isAnimating ? 3 : 1 }} // Désactivé après animation exit
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="header-container-master">
      <div className="header-container container">
        <div className="header-container-block">
          {/*<a className="button-contact link" href="/">
            STUDIO HAQUIN ©
          </a>*/}
          <a href="/" className="header-logo link">
            <WebsiteIcon className="header-menu-icon" />
            <div className="header-text">
              <Typewriter
                options={{
                  strings: [displayText],
                  autoStart: true,
                  loop: false, // Pas de boucle pour chaque texte (géré par le cycle)
                  delay: 70,
                  deleteSpeed: 35,
                  pauseFor: isGreeting ? 14000 : 4000, // Durée de pause pour chaque texte
                } as any}
              />
            </div>
          </a>
          <div className="header-button link">
            <a className="button-contact hover-sound-contact" onClick={toggleMenu}>
              {isMenuOpen ? "FERMER" : "MENU"}
            </a>
            <a
              className="button-contact-img link"
              //href="mailto:hello@studiohaquin.com?subject=J'ai un super projet à vous proposer ! 😎&body=Hello Andy ! (très beau prénom), J'ai pour projet de…"
              href="https://linkedin.com/in/andyhaquin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <NewLinkIcon />
            </a>
          </div>
        </div>
        <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
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