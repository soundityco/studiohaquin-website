import React, { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Link } from "react-scroll";
import { NewLinkIcon, WebsiteIcon } from "@/components/Images";

const Header = forwardRef<HTMLElement>((props, ref) => {
  const [displayText, setDisplayText] = useState("Studio Haquin ©");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const greetings = [
      { range: [0, 6], text: "Il est un peu tard, non ? 🧐" },
      { range: [6, 12], text: "Bonne journée ! 😇" },
      { range: [12, 14], text: "Miam, bon appétit ! 🍕" },
      { range: [14, 18], text: "Une petite sieste ? 😌" },
      { range: [18, 24], text: "Je vais pas tarder… 😴" },
    ];
    const currentHour = new Date().getHours();
    const greeting = greetings.find(({ range }) => currentHour >= range[0] && currentHour < range[1]);
    setDisplayText(greeting ? greeting.text : "Studio Haquin");
  }, []);

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
                options={{ autoStart: true, loop: false, delay: 70, deleteSpeed: 35 }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(displayText)
                    .pauseFor(4000) // Simulé par un setTimeout si nécessaire
                    .deleteAll()
                    .start();
                }}
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
