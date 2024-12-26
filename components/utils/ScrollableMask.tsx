import React, { useRef, useState, useEffect } from "react";

interface ScrollableMaskProps {
  children: React.ReactNode;
  fadeSize?: string; // Par exemple "5%" ou "20px"
}

const ScrollableMask: React.FC<ScrollableMaskProps> = ({ children, fadeSize = "5%" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Détecte si on est au début ou à la fin du défilement
    setShowLeftFade(scrollLeft > 0);
    setShowRightFade(scrollLeft < scrollWidth - clientWidth);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Vérifier initialement la position de défilement
    handleScroll();

    // Ajouter un écouteur d'événements pour le défilement
    container.addEventListener("scroll", handleScroll);

    // Nettoyer l'écouteur à la fin
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scrollable-mask-container" style={{ position: "relative", overflow: "hidden" }}>
      {/* Masques de dégradé */}
      {showLeftFade && (
        <div
          className="fade fade-left"
          style={{
            width: fadeSize,
            left: 0,
          }}
        />
      )}
      {showRightFade && (
        <div
          className="fade fade-right"
          style={{
            width: fadeSize,
            right: 0,
          }}
        />
      )}

      {/* Conteneur scrollable */}
      <div
        className="scrollable-mask-content"
        ref={containerRef}
        style={{ overflowX: "auto", overflowY: "hidden" }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollableMask;