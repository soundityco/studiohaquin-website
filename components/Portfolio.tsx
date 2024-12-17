import React, { useState, useEffect, useRef } from "react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayerPlayButton,
} from "./Images";

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
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hiddenThumbnails, setHiddenThumbnails] = useState<string[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const popupRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0); // Pour mesurer la distance du drag

  const projects: Project[] = [
    {
      name: "Decathlon",
      description: "Mini série 'Réussites'",
      date: "2024",
      content: {
        videoIds: ["FIpooQI-Qko",
                   "u3qvu__U6Wc",
                   "0NhUkX7_qSA"],
        iframes: [],
        text: {
          description:
            "Réalisation d'une série de vidéos promotionnelles et divertissantes destinées aux réseaux sociaux pour Decathlon Les Ponts-de-Cé.",
        },
      },
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
      name: "Faux Raccords Prod",
      description: "Court métrage 'L'ERMITE'",
      date: "2023",
      content: {
        videoIds: [
          "JmFNhAO9LEs"
        ],
        iframes: [],
        text: {
          description: "Réalisation, captation, montage et sound design du court métrage 'L'ERMITE'"
        }
      }
    }
  ];

  const handleClick = (index: number) => {
    setActiveProjectIndex(index);
  };

  const handleNextProject = () => {
    setActiveProjectIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevProject = () => {
    setActiveProjectIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (activeProjectIndex !== null) {
      const timer = setTimeout(() => setIsPopupActive(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsPopupActive(false);
    }
  }, [activeProjectIndex]);

  useEffect(() => {
    if (activeProjectIndex !== null) {
      setHiddenThumbnails([]);
      setActiveVideoId(null);
    }
  }, [activeProjectIndex]);

  const handleThumbnailClick = (videoId: string) => {
    if (dragDistance.current > 5) {
      // Ignorer les clics si un drag a été détecté
      return;
    }

    if (activeVideoId === videoId) return;

    setHiddenThumbnails((prev) => {
      const updatedThumbnails = prev.filter((id) => id !== activeVideoId);
      updatedThumbnails.push(videoId);
      return updatedThumbnails;
    });

    setActiveVideoId(videoId);
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragDistance.current = 0; // Réinitialiser la distance au début du drag
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5; // Multiplier pour ajuster la vitesse
    dragDistance.current += Math.abs(x - startX.current); // Calculer la distance parcourue
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const activeProject =
    activeProjectIndex !== null ? projects[activeProjectIndex] : null;

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
                activeProjectIndex === index ? "activeProject" : ""
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

      {activeProject && (
        <div
          className={`portfolio-popup-container ${
            isPopupActive ? "active" : ""
          } ${isClosing ? "closing" : ""}`}
          ref={popupRef}
        >
          <div className="portfolio-popup-container-overlay"></div>
          <div className="portfolio-popup-content">
            <div className="portfolio-popup-content-header">
                  <div className="portfolio-popup-content-header-block">
                    <h2>{activeProject.name}</h2>
                    <div className="portfolio-popuselection-block">
                      <span onClick={handlePrevProject}>
                        <ArrowLeftIcon className="portfolio-icon" />
                      </span>
                      <span onClick={handleNextProject}>
                        <ArrowRightIcon className="portfolio-icon" />
                      </span>
                    </div>
                  </div>
                  <div className="portfolio-popup-content-header-block">
                    <h3>{activeProject.description} • {activeProject.date}</h3>
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
            <div
              className="portfolio-popup-dynamic-content horizontal-scroll"
              ref={scrollContainerRef}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              {activeProject.content.videoIds?.map((videoId, i) => (
                <div key={i} className="portfolio-popup-dynamic-content-video">
                  {!hiddenThumbnails.includes(videoId) && (
                    <div className="portfolio-popup-dynamic-content-thumbnail-block">
                      <PlayerPlayButton className="portfolio-video-play-button" />
                      <img
                        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={`Thumbnail for Video ${i + 1}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleThumbnailClick(videoId)}
                        draggable="false"
                      />
                    </div>
                  )}
                  {activeVideoId === videoId && (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&controls=1&modestbranding=1&autoplay=1`}
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
            <p className="portfolio-scroll">
              (&nbsp;SCROLL&nbsp;<ArrowRightIcon />&nbsp;)
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
