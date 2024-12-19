{/*import React, { useRef, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

export default function Intro() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollDone, setScrollDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      direction: "vertical",
    });

    const onScroll = () => {
      const section = sectionRef.current;
      const container = containerRef.current;

      if (!section || !container) return;

      const { top, height } = section.getBoundingClientRect();
      const { width } = container.getBoundingClientRect();

      // Calculer la progression
      const progress = Math.abs(top) / height;

      // Activer le "sticky" lorsque la section atteint le haut de la fenêtre
      if (top <= 0 && !scrollDone) {
        setIsSticky(true);
      }

      // Désactiver le "sticky" lorsque l'animation horizontale est terminée
      if (isSticky) {
        container.style.transform = `translateX(-${progress * 100}%)`;

        const hasReachedEnd =
          Math.abs(progress * width) >= width - window.innerWidth;

        if (hasReachedEnd) {
          setScrollDone(true);
          setIsSticky(false);
        }
      }
    };

    lenis.on("scroll", onScroll);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isSticky, scrollDone]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "150vh", // Permet un espace pour scroller jusqu'à cette section
        overflow: "hidden",
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: "flex",
          height: "100vh",
          width: "200%", // Largeur pour permettre le scroll horizontal
          position: isSticky ? "fixed" : "relative",
          top: 0,
          left: 0,
          zIndex: 10,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="intro-container container">
          <h3 className="intro-container-title">01. ABOUT</h3>
          <p className="intro-container-text">
            <span>Filmmaker, sound designer & composer, basé à Angers.</span>
            <br />
            <span>
              De la prise de vue au montage, en passant par la conception sonore
              et graphique, j’apporte une attention particulière aux détails
              pour vous offrir des créations qui reflètent votre identité, afin
              de raconter votre histoire de façon authentique et impactante.
            </span>
          </p>
        </div>

        <div className="intro-container container">
          <h3 className="intro-container-title">02. NEXT</h3>
          <p className="intro-container-text">
            <span>Filmmaker, sound designer & composer, basé à Angers.</span>
            <br />
            <span>
              De la prise de vue au montage, en passant par la conception sonore
              et graphique, j’apporte une attention particulière aux détails
              pour vous offrir des créations qui reflètent votre identité, afin
              de raconter votre histoire de façon authentique et impactante.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}*/}



import React from "react";

export function Intro() {;

  return (
    <section className="intro" id="intro">

      <div className="intro-container container">
        <h3 className="intro-container-title">01. ABOUT</h3>
        <p className="intro-container-text">
          <span>Filmmaker, sound designer & compositeur, basé à Angers.</span><br/>
          <span>De la prise de vue au montage, en passant par la conception sonore et graphique, j’apporte une attention particulière aux détails pour vous offrir des créations qui reflètent votre identité, afin de raconter votre histoire de façon authentique et impactante.</span>
        </p>
      </div>

      {/*<div className="intro-container container"> 
        <h3 className="intro-container-title">01. ABOUT</h3>
        <p className="intro-container-text">
          <span>Filmmaker, sound designer & composer, basé à Angers.</span><br/>
          <span>De la prise de vue au montage, en passant par la conception sonore et graphique, j’apporte une attention particulière aux détails pour vous offrir des créations qui reflètent votre identité, afin de raconter votre histoire de façon authentique et impactante.</span>
        </p>
      </div>*/}
    </section>
  );
}

export default Intro;