import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./Images";

interface Project {
  name: string;
  description: string;
  date: string;
}

export function Portfolio() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLeftPressed, setIsLeftPressed] = useState(false); // Pour l'état de la touche flèche gauche
  const [isRightPressed, setIsRightPressed] = useState(false); // Pour l'état de la touche flèche droite
  const popupRef = useRef<HTMLDivElement | null>(null);

  const projects: Project[] = [
    {
      name: "Decathlon",
      description: "Série de vidéos réseaux sociaux",
      date: "2024",
    },
    {
      name: "L'Orange Bleue",
      description: "Interviews + pub",
      date: "2024",
    },
    {
      name: "Polyphonia",
      description: "Web design + développement",
      date: "2024",
    },
    {
      name: "La Cour",
      description: "Vidéo réseaux sociaux",
      date: "2024",
    },
    {
      name: "Airval Studio",
      description: "Web design + developpement",
      date: "2024",
    },
    {
      name: "blurblur",
      description: "Web design + developpement",
      date: "2024",
    },
    {
      name: "Doris Oppenlander",
      description: "Série de vidéos YouTube",
      date: "2023 — 2024",
    },
    {
      name: "Soundity",
      description: "Web design + developpement",
      date: "2023",
    },
    {
      name: "Noelse",
      description: "Création graphique + motion design + 3D",
      date: "2021 — 2023",
    },
    {
      name: "Anuit' Anjou (Fictif)",
      description: "Création graphique + motion design",
      date: "2021",
    },
    {
      name: "ESA",
      description: "Création graphique + 3D",
      date: "2021",
    },
  ];

  const handleClick = (index: number) => {
    setActiveProjectIndex(index);
  };

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveProjectIndex(null);
      setIsClosing(false);
    }, 300);
  };

  const handleNextProject = () => {
    setActiveProjectIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      return prevIndex === projects.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handlePrevProject = () => {
    setActiveProjectIndex((prevIndex) => {
      if (prevIndex === null) return projects.length - 1;
      return prevIndex === 0 ? projects.length - 1 : prevIndex - 1;
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClosePopup();
    } else if (activeProjectIndex !== null) {
      if (e.key === "ArrowRight") {
        setIsRightPressed(true);
        handleNextProject();
      } else if (e.key === "ArrowLeft") {
        setIsLeftPressed(true);
        handlePrevProject();
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setIsRightPressed(false);
    } else if (e.key === "ArrowLeft") {
      setIsLeftPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeProjectIndex]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    if (activeProjectIndex !== null) {
      window.addEventListener("mousedown", handleOutsideClick);
    } else {
      window.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeProjectIndex]);

  useEffect(() => {
    if (activeProjectIndex !== null) {
      const timer = setTimeout(() => setIsPopupActive(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsPopupActive(false);
    }
  }, [activeProjectIndex]);

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-container container">
        <nav>
          <ul>
            <li>Crédits</li>
            <li>Projets</li>
            <li>Date</li>
          </ul>
        </nav>
        <div>
          {projects.map((project, index) => (
            <a
              key={project.name}
              className="div-to-click show-me"
              onClick={() => handleClick(index)}
            >
              <span>{project.name}</span>
              <span>{project.description}</span>
              <span>{project.date}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Popup Section */}
      {activeProjectIndex !== null && (
        <div className={`portfolio-popup ${isPopupActive ? 'active' : ''} ${isClosing ? 'closing' : ''}`}>
          <div className={`portfolio-popup-container ${isPopupActive ? 'active' : ''} ${isClosing ? 'closing' : ''}`} ref={popupRef}>
            <div className="portfolio-popup-content">
              <div className="portfolio-popup-content-header">
                <div className="portfolio-popup-content-header-block">
                  <h2>{projects[activeProjectIndex].name}</h2>
                  <div>
                    <p>{projects[activeProjectIndex].description}</p>
                    <p>{projects[activeProjectIndex].date}</p>
                  </div>
                </div>
                <div className="portfolio-popup-content-header-block">
                  <span onClick={handleClosePopup}>
                    <CloseIcon className="portfolio-icon" />
                  </span>
                  <div>
                    <span onClick={handlePrevProject}>
                      <ArrowLeftIcon className={`portfolio-icon ${isLeftPressed ? 'pressed' : ''}`} />
                    </span>
                    <span onClick={handleNextProject}>
                      <ArrowRightIcon className={`portfolio-icon ${isRightPressed ? 'pressed' : ''}`} />
                    </span>
                  </div>
                </div>
              </div>

              {/* CONTENT HERE */}
              
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Portfolio;