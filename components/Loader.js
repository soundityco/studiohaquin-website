import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

export function Loader({ lenis }) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Forcer le scroll en haut de page dès que le Loader est monté
    window.scrollTo(0, 0);

    // Désactiver le scroll via Lenis
    if (lenis) lenis.stop();

    // Activer la suppression du loader après l'animation
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (lenis) lenis.start(); // Réactiver le scroll
    }, 6500); // 6.5s : durée totale de l'animation

    return () => clearTimeout(timer);
  }, [lenis]);

  return (
    isAnimating && (
      <section className="loader">
        <h1 className="loader-title">
          <Typewriter
            options={{
              strings: ["STUDIO HAQUIN ©", "FILMMAKER & SOUND DESIGNER"],
              autoStart: true,
              loop: false,
              delay: 70,
              deleteSpeed: 35,
              pauseFor: 700,
            }}
          />
        </h1>
      </section>
    )
  );
}

export default Loader;