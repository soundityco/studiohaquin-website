import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, ArrowCornerIcon, PlayerPlayButton } from "./Images";
import VideoPlayer from "@/components/VideoPlayer";

interface Project {
  name: string;
  description: string;
  date: string;
  content: {
    videoIds?: string[];
    iframes?: string[];
    text?: {
      title?: string;
      subtitle?: string;
      description: string;
      links?: { label: string; url: string }[];
    };
  };
}

export function Portfolio() {
  //const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLeftPressed, setIsLeftPressed] = useState(false);
  const [isRightPressed, setIsRightPressed] = useState(false);
  const [hiddenThumbnails, setHiddenThumbnails] = useState<string[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const projects: Project[] = [
    {
      name: "Decathlon",
      description: "Mini série 'Réussites'",
      date: "2024",
      content: {
        videoIds: ["FIpooQI-Qko",
                   "pOXqF5LxT5k",
                   "0NhUkX7_qSA"],
        iframes: [],
        text: {
          description:
            "Réalisation d'une série de vidéos promotionnelles et divertissantes destinées aux réseaux sociaux pour Decathlon Les Ponts-de-Cé.",
        },
      },
    },
    {
      name: "Galeries Lafayette",
      description: "Évènement 'Mère Fille'",
      date: "2024",
      content: {
        videoIds: ["J2JJ-yZ2ujk"],
        iframes: [],
        text: {
          description:
            "Réalisation d'une vidéo promotionnelle pour l'évènement 'Mère et Fille' 2024 des Galeries Lafayette d'Angers.",
        },
      },
    },
    {
      name: "L'Orange Bleue",
      description: "Pub + Interviews",
      date: "2024",
      content: {
        videoIds: [
          "p5dpBF0kLKU"
        ],
        iframes: [],
        text: {
          description: "Réalisation d'une vidéo promotionnelle et d'interviews pour L'Orange Bleue d'Angers."
        }
      }
    },
    {
      name: "La Cour",
      description: "Rénovation du restaurant",
      date: "2024",
      content: {
        videoIds: [
          "P4d_1Tb2uAw"
        ],
        iframes: [],
        text: {
          description: "Réalisation d'une vidéo promotionnelle pour la rénovation du bar & restaurant 'La Cour', situé à Angers."
        }
      }
    },
    {
      name: "Doris Oppenlander",
      description: "Série de vidéos YouTube",
      date: "2023 — 2024",
      content: {
        videoIds: [
          "H6wkoTE8oyo",
          "IFKT_fekZw4",
          "QTpHOYt04QU",
          "DhnqP_J-MoQ",
          "YB3SCKTtBLM",
          "ZbT4yy6ZU6I",
          "Dwnl_BvyhdY"
        ],
        iframes: [],
        text: {
          description: "Réalisation d'une série de vidéos YouTube sur le divertissement et la vulgarisation du chant par Doris Oppenlander."
        }
      }
    },
    {
      name: "Faux Raccords Prod",
      description: "Court métrage L'ERMITE",
      date: "2023",
      content: {
        videoIds: [
          "JmFNhAO9LEs"
        ],
        iframes: [],
        text: {
          description: "Conception et création de contenu graphique et vidéos pour les réseaux sociaux et le site web de la banque en ligne Noelse."
        }
      }
    }
  ];

  const handleClick = (index: number) => {
    setActiveProjectIndex(index);
  };

  /*const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveProjectIndex(null);
      setIsClosing(false);
    }, 300);
  };*/

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
    if (activeProjectIndex !== null) {
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

  /*const handleOutsideClick = (e: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      handleClosePopup();
    }
  };*/

  /*useEffect(() => {
    if (activeProjectIndex !== null) {
      window.addEventListener("mousedown", handleOutsideClick);
    } else {
      window.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeProjectIndex]);*/

  useEffect(() => {
    if (activeProjectIndex !== null) {
      const timer = setTimeout(() => setIsPopupActive(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsPopupActive(false);
    }
  }, [activeProjectIndex]);

  // Réinitialiser les vidéos quand on change de projet
  useEffect(() => {
    if (activeProjectIndex !== null) {
      setHiddenThumbnails([]); // Réinitialise la visibilité des miniatures
      setActiveVideoId(null);   // Réinitialise la vidéo active
    }
  }, [activeProjectIndex]); // Cet effet se déclenche lorsque le projet change

  const handleThumbnailClick = (videoId: string) => {
    // Si la vidéo cliquée est déjà celle active, on ne fait rien
    if (activeVideoId === videoId) return;
  
    // Réinitialiser la liste des miniatures visibles, réapparaître la vidéo précédente
    setHiddenThumbnails((prev) => {
      // Enlever l'ancienne vidéo de la liste des miniatures masquées
      const updatedThumbnails = prev.filter((id) => id !== activeVideoId);
  
      // Ajouter la nouvelle vidéo à la liste des vidéos masquées
      updatedThumbnails.push(videoId);
  
      return updatedThumbnails;
    });
  
    // Définir la nouvelle vidéo comme active
    setActiveVideoId(videoId);
  };

  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;

  return (
    <section className="portfolio" id="portfolio" data-scroll-container="true">
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
              className={`div-to-click show-me ${
                activeProjectIndex === index ? 'activeProject' : ''
              }`}
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
      {activeProject && (
          <div
            className={`portfolio-popup-container ${isPopupActive ? 'active' : ''} ${isClosing ? 'closing' : ''}`}
            ref={popupRef}
          >
            <div className="portfolio-popup-container-overlay"></div>
            <div className="portfolio-popup-content">
              <div className="portfolio-popup-content-header">
                <div>
                  <div className="portfolio-popup-content-header-block">
                    <h2>{activeProject.name}</h2>
                    <div>
                      <h3>{activeProject.description} • {activeProject.date}</h3>
                      {/*<p>{activeProject.date}</p>*/}
                    </div>
                  </div>
                  <div className="portfolio-popup-content-header-block">
                    {/*<span onClick={handleClosePopup}>
                      <CloseIcon className="portfolio-icon" />
                    </span>*/}
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
                <div>
                  {activeProject.content.text && (
                    <>
                      {activeProject.content.text.title && <h3>{activeProject.content.text.title}</h3>}
                      {activeProject.content.text.subtitle && <h4>{activeProject.content.text.subtitle}</h4>}
                      {activeProject.content.text.description && <p>{activeProject.content.text.description}</p>}
                      {activeProject.content.text.links?.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Dynamic content */}
              <div className="portfolio-popup-dynamic-content">
                {activeProject.content.videoIds?.map((videoId, i) => (
                  <div key={i} className="portfolio-popup-dynamic-content-video">
                    {/* Afficher la miniature si elle n'est pas masquée */}
                    {!hiddenThumbnails.includes(videoId) && (
                      <div className="portfolio-popup-dynamic-content-thumbnail-block">
                          <PlayerPlayButton className="portfolio-video-play-button" />
                        <img
                          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                          alt={`Thumbnail for Video ${i + 1}`}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleThumbnailClick(videoId)} // Masquer l'image au clic
                          draggable="false"
                        />
                      </div>
                    )}

                    {/* Afficher l'iframe avec autoplay si c'est la vidéo active */}
                    {activeVideoId === videoId && (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&controls=1&modestbranding=1&autoplay=1`} // Ajout du paramètre autoplay
                        title={`Video ${i + 1}`}
                        width="100%"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                ))}
              </div>
              <p className="portfolio-scroll">(&nbsp;SCROLL&nbsp;<ArrowRightIcon/>&nbsp;)</p>
            </div>
          </div>
      )}

    </section>
  );
}
