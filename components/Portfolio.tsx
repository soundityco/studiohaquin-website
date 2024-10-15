import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./Images";

interface Project {
  name: string;
  description: string;
  date: string;
  content?: {
    videos?: string[];
    photos?: string[];
    iframes?: string[];
    text?: {
      title?: string;
      subtitle?: string;
      description?: string;
      links?: { label: string; url: string }[];
    };
  };
}

export function Portfolio() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLeftPressed, setIsLeftPressed] = useState(false); 
  const [isRightPressed, setIsRightPressed] = useState(false); 
  const popupRef = useRef<HTMLDivElement | null>(null);

  const projects: Project[] = [
    {
      name: "Decathlon",
      description: "Série de vidéos réseaux sociaux",
      date: "2024",
      content: {
        videos: ["https://player.vimeo.com/video/993371219?h=18665354fd"],
        text: {
          description: "Réalisation d'une série de vidéos promotionnelles et divertissantes destinées aux réseaux sociaux pour Decathlon Les Ponts-de-Cé.",
        },
      },
    },
    {
      name: "Galeries Lafayette",
      description: "Vidéo réseaux sociaux",
      date: "2024",
      content: {
        videos: ["https://player.vimeo.com/video/1013996537?h=83d93ee44b"],
        text: {
          description: "Réalisation d'une vidéo promotionnelle pour l'évènement 'Mère et Fille' 2024 des Galeries Lafayette d'Angers.",
        },
      },
    },
    // autres projets ici...
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

              {/* Text Content */}
              {projects[activeProjectIndex].content?.text && (
                <div>
                  {projects[activeProjectIndex].content.text.title && <h3>{projects[activeProjectIndex].content.text.title}</h3>}
                  {projects[activeProjectIndex].content.text.subtitle && <h4>{projects[activeProjectIndex].content.text.subtitle}</h4>}
                  <p>{projects[activeProjectIndex].content.text.description}</p>
                  {projects[activeProjectIndex].content.text.links?.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Dynamic content */}
              <div className="portfolio-popup-dynamic-content">
                {/* Video Content */}
                {projects[activeProjectIndex].content?.videos?.map((videoUrl, i) => (
                  <iframe
                    key={i}
                    width="560"
                    height="315"
                    src={videoUrl}
                    title="Project Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}

                {/* Photo Content */}
                {projects[activeProjectIndex].content?.photos?.map((photoUrl, i) => (
                  <img key={i} src={photoUrl} alt={`Project ${projects[activeProjectIndex].name}`} />
                ))}

                {/* Iframe Content */}
                {projects[activeProjectIndex].content?.iframes?.map((iframeUrl, i) => (
                  <iframe
                    key={i}
                    src={iframeUrl}
                    title="Project Iframe"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}