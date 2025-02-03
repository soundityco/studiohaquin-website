import React, { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Link } from "react-scroll";
import { NewLinkIcon, WebsiteIcon } from "@/components/Images";

const Header = forwardRef<HTMLElement>((props, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isGreeting, setIsGreeting] = useState<boolean>(false); // Détermine si on affiche le greeting ou "Studio Haquin"
  const [displayText, setDisplayText] = useState("Studio Haquin ©");

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
    const handleScroll = () => setHasScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) setIsAnimating(true);
    setIsMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { to: "portfolio", label: "Portfolio", duration: 200 },
    { to: "intro", label: "À PROPOS", duration: 400 },
    { to: "footer", label: "Contact", duration: 600 },
  ];

  const externalLinks = [
    { href: "https://www.instagram.com/studiohaquin", label: "Instagram" },
    { href: "https://www.linkedin.com/in/andyhaquin", label: "LinkedIn" },
  ];

  return (
    <motion.header
      ref={ref}
      className={`header ${isMenuOpen ? "menu-open" : ""} ${hasScrolled ? "scrolled" : ""} ${isMenuOpen && hasScrolled ? "scrolled-no-blur" : ""}`}
      animate={{ height: isMenuOpen ? "100svh" : "auto", backgroundColor: isMenuOpen ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)" }}
      style={{ zIndex: isAnimating ? 3 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="header-container-master">
        <div className="header-container container">
          <div className="header-container-block">
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
              <a className="button-contact hover-sound-contact" onClick={toggleMenu}>{isMenuOpen ? "FERMER" : "MENU"}</a>
              <a className="button-contact-img link" href="https://linkedin.com/in/andyhaquin" target="_blank" rel="noopener noreferrer">
                <NewLinkIcon />
              </a>
            </div>
          </div>
          <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
            {isMenuOpen && (
              <motion.div className="header-menu-content" initial="hidden" animate="visible" exit="exit" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut", delay: 0.3, staggerChildren: 0.1, delayChildren: 0.3 } }, exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } } }}>
                <nav>
                  <ul>
                    {navLinks.map(({ to, label, duration }) => (
                      <li key={to}>
                        <Link to={to} smooth={true} duration={duration} onClick={() => setIsMenuOpen(false)} className="link">{label}</Link>
                      </li>
                    ))}
                    {externalLinks.map(({ href, label }) => (
                      <li key={href}>
                        <a href={href} target="_blank" rel="noopener noreferrer" className="link">{label}</a>
                      </li>
                    ))}
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