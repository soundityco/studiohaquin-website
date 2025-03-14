import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

export function Loader({ lenis, onLoaderComplete }) { // Ajout de onLoaderComplete
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Désactiver le scroll avec Lenis
    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true }); // Forcer en haut pour le Loader
    }

    // Activer la suppression du loader après l'animation
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (onLoaderComplete) onLoaderComplete(); // Callback après l'animation
      if (lenis) lenis.start(); // Réactiver le scroll
    }, 6500); // Durée totale de l'animation

    return () => clearTimeout(timer);
  }, [lenis, onLoaderComplete]);

  return (
    isAnimating && (
      <section className="loader">
        <div className="container">
          <h1 className="loader-title">
            <Typewriter
              options={{
                strings: ["STUDIO HAQUIN", "GRAPHIC & WEB DESIGNER / MOTION DESIGNER"],
                autoStart: true,
                loop: false,
                delay: 60,
                deleteSpeed: 50,
                pauseFor: 500,
              }}
            />
          </h1>
        </div>
      </section>
    )
  );
}

export default Loader;
