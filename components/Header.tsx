import React, { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Link } from "react-scroll";
import { NewLinkIcon, WebsiteIcon, ArrowRightIcon } from "@/components/Images";

// Définition des types pour les liens internes et externes
type InternalLink = { to: string; label: string; duration: number; type: "internal" };
type ExternalLink = { href: string; label: string; type: "external" };

const Header = forwardRef<HTMLElement>((props, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
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
    if (isMenuOpen) {
      // Si le menu est ouvert et qu'on le ferme, on active isClosing pour forcer le no-blur durant la fermeture
      setIsClosing(true);
    } else {
      setIsAnimating(true);
    }
    setIsMenuOpen((prev) => !prev);
  };

  const navLinks: InternalLink[] = [
    { to: "portfolio", label: "Portfolio", duration: 200, type: "internal" },
    { to: "intro", label: "À PROPOS", duration: 400, type: "internal" },
    { to: "footer", label: "Contact", duration: 600, type: "internal" },
  ];

  const externalLinks: ExternalLink[] = [
    { href: "https://www.instagram.com/studiohaquin", label: "Instagram", type: "external" },
    { href: "https://www.linkedin.com/in/andyhaquin", label: "LinkedIn", type: "external" },
  ];

  const combinedLinks: Array<InternalLink | ExternalLink> = [
    ...navLinks,
    ...externalLinks,
  ];

  return (
    <motion.header
      ref={ref}
      className={`header ${isMenuOpen ? "menu-open" : ""} ${
                        hasScrolled ? (isMenuOpen || isClosing ? "scrolled-no-blur" : "scrolled") : ""
      }`}
      animate={{ 
        height: isMenuOpen ? "100svh" : "auto", 
        backgroundColor: isMenuOpen ? "rgba(0, 0, 0, 1)" : "" 
      }}
      style={{ zIndex: isAnimating ? 3 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="header-container-master">
        <div className="header-container container">
          <div className="header-container-block">
            <a href="/" className="header-logo link">
              <WebsiteIcon className="header-menu-icon" />
              <div className="header-text">
                {/*<Typewriter
                  options={{
                    //strings: ['STUDIO HAQUIN', 'GRAPHIC & MOTION DESIGNER'],
                    strings: [displayText],
                    autoStart: true,
                    loop: false,
                    delay: 70,
                    deleteSpeed: 35,
                    pauseFor: isGreeting ? 14000 : 4000,
                    cursor: "",
                  } as any}
                />*/}
                STUDIO HAQUIN
              </div>
            </a>
            <div className="header-button link">
              <a className="button-contact hover-sound-contact" onClick={toggleMenu}>
                {isMenuOpen ? "FERMER" : "MENU"}
              </a>
              <a
                className="button-contact-img link"
                href="https://linkedin.com/in/andyhaquin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <NewLinkIcon />
              </a>
            </div>
          </div>
          <AnimatePresence
            onExitComplete={() => {
              setIsAnimating(false);
              setIsClosing(false);
            }}
          >
            {isMenuOpen && (
              <motion.div
                className="header-menu-content"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1, 
                    transition: { duration: 0.5, ease: "easeInOut", delay: 0.3, staggerChildren: 0.35, delayChildren: 0.75 } 
                  },
                  exit: { 
                    opacity: 0, 
                    transition: { duration: 0.2, ease: "easeInOut" } 
                  },
                }}
              >
                <nav>
                  <ul>
                    {combinedLinks.map((link, index) => {
                      const key = link.type === "internal" ? link.to : link.href;
                      return (
                        <motion.li
                          key={key!}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.1 }}
                        >
                          <ArrowRightIcon className="header-menu-content-icon" />
                          {link.type === "internal" ? (
                            <Link
                              to={link.to!}
                              smooth={true}
                              duration={link.duration!}
                              onClick={() => setIsMenuOpen(false)}
                              className="link"
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <a
                              href={link.href!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link"
                            >
                              {link.label}
                            </a>
                          )}
                        </motion.li>
                      );
                    })}
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
