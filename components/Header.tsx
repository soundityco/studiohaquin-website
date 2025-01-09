import React, { useState, useEffect, forwardRef } from "react";
import Typewriter from "typewriter-effect";

// Importing Icons
import { WebsiteIcon, NewLinkIcon } from "./Images";

const Header = forwardRef<HTMLElement>((props, ref) => {
  const [displayText, setDisplayText] = useState<string>("Studio Haquin ©"); // Texte affiché
  const [isGreeting, setIsGreeting] = useState<boolean>(false); // Détermine si on affiche le greeting ou "Studio Haquin"

  useEffect(() => {
    const updateText = () => {
      if (isGreeting) {
        setDisplayText("Studio Haquin");
        setTimeout(() => setIsGreeting(false), 15000); // Revenir à Studio Haquin pour 15 secondes
      } else {
        const currentHour = new Date().getHours();
        if (currentHour >= 0 && currentHour < 6) {
          setDisplayText("Il est un peu tard, non ?");
        } else if (currentHour >= 6 && currentHour < 12) {
          setDisplayText("Bonjour !");
        } else if (currentHour >= 12 && currentHour < 18) {
          setDisplayText("Bon après-midi !");
        } else {
          setDisplayText("Bonsoir !");
        }
        setTimeout(() => setIsGreeting(true), 5000); // Afficher le greeting pour 5 secondes
      }
    };

    updateText(); // Initialiser le cycle dès le chargement

    // Met à jour le texte en boucle
    const interval = setInterval(updateText, 20000); // 20s = 5s (greeting) + 15s (Studio Haquin)

    return () => clearInterval(interval); // Nettoyage
  }, [isGreeting]);

  return (
    <header className="header" ref={ref}>
      <div className="header-container container">
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
        <div className="header-button">
          <a
            className="button-contact hover-sound-contact"
            href="mailto:mailto:andy@studiohaquin.com?subject=J'ai un super projet à vous proposer ! 😎&body=Hello Andy ! (très beau prénom), J'ai pour projet de…"
          >
            Me contacter
          </a>
          <a
            className="button-contact-img link"
            href="https://instagram.com/studiohaquin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NewLinkIcon />
          </a>
        </div>
      </div>
    </header>
  );
});

export default Header;